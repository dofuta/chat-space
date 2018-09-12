class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new

    respond_to do |format|
      # htmlの時
      format.html do
        @messages = @group.messages
        @groups = current_user.groups.includes(:user)
      end
      # jsonの時（メッセージの自動アップデートのjsで呼び出すようになっている）
      format.json do
        @messages = @group.messages.includes(:user).where("id > ?", params[:last_message_id])
      end
    end
  end

  def create
    @message = @group.messages.new(message_params) #ネストさせてnewすることで、自動で親のidが子の'親_id'カラムに挿入される
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path, notice: "メッセージを送信しました。"}
        format.json
      end
      # html使わないならrespond_to :json の方が良さそう
    else
      #未入力の判定はjqueryですでに行なっているので基本的にはここは読まれない
      redirect_to group_messages_path, alert: "メッセージを入力してください。"
    end
  end




  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])#この:group_idは、URIからとってきたので、文字列
  end
end
