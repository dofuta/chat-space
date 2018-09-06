require "rails_helper"
describe MessagesController do
  #letを使って複数回の処理を一個にまとめている。ブロックを使っている？
  let(:group){ create(:group)}
  let(:user){ create(:user)}
  let(:message){ create(:message, group_id: group.id, user_id: user.id)}

#indexアクション
  describe 'GET #index' do
    context"log in" do
      before do #before doで処理をまとめている
        sign_in user#このuserは上記のletで定義したもの。sign_inはdeviseのrspecの設定をすると利用できる様になるメソッド
        get :index, params:{group_id: group.id}#getメソッドを使って、第一引数のアクションを呼び出す。'get :show, id: 1'のようにも記述でき、メソッドの引数部分()が省略されている状態。id:1のように、キー:値を引数に入れるとパラメータとしてそのアクションに送られる。
      end
      #@messageの中身が正常か（Message.newになっているか）確認する
      it "assign the requested contact to @message" do
        expect(assigns(:message)).to be_a_new(Message)#新しい未保存のインスタンスと一致しているか、は、be_a_new
      end
      #@messagesの中身が正しいか、ここで作成したmessagesと一致するかのexpectで確認する
      it "assign the requested contact to @messages" do
        messages = group.messages
        expect(assigns(:messages)).to eq messages #assigns(:インスタンス変数)メソッドは、直前でgetしたアクション内にある、インスタンス変数を取ってくる。それと、ここで今作ったgroupが一致しているか確認している。
      end
      #@groupがここで作成したgroupと一致するか確認する
      it "assign the requested contact to @group" do
        expect(assigns(:group)).to eq group
      end
      #@groupsがここで作成したgroupsと一致するか確認する
      it "assign the requested contact to @groups" do
        groups = user.groups
        expect(assigns(:groups)).to eq groups
      end
      #上記のHTTPリクエストを送った後に、indexアクションにしっかり遷移しているかを確認する。
      it "renders the :index template" do
        expect(response).to render_template :index #responseは、getで取得した遷移先のビューの情報を持つインスタンス。render_templateマッチャは、引数で指定したアクションがリクエストされた時に自動的に遷移するビューを返す。
      end
    end
    context "not log in" do
      #サインインしていない時には、new_user_session_pathへリダイレクトされることを確認する。
      it "redirect to new_user_session_path" do
        get :index, params: { group_id: group.id } #group.idとしなくて良い？groupでもいいらしい。paramsを送っている
        expect(response).to redirect_to new_user_session_path
      end
    end
  end

#createアクション
  describe 'POST #create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } } #attributes_forは、ハッシュのみを生成するfactorygirlのメソッド
    context 'log in' do
      before do
        sign_in user
      end
      context 'can save' do
        #HTTPリクエストの擬似送信の部分が長いので、subjectでまとめている。
        subject {
          post :create,
          params: params
        }

        #メッセージが保存されているかを確認する
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)#changeマッチャは、(モデル, :count).by(1)でレコードの増加したかで作成されたかを判断。正しければテストを成功させる
        end

        #アクションの処理後にリダイレクトしているか確認する
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        #subjectでHTTPリクエストをまとめている。letでパラメータをまとめている
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        # パラメータがおかしいとmessageは保存されないことを確認する
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        #パラメータがおかしい状態についても、アクションの処理後にリダイレクトしているか確認する
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context 'not log in' do
      #サインインしていない時には、new_user_session_pathへリダイレクトされることを確認する。
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
