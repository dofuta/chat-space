require 'rails_helper'
describe Message do #Messageクラスのなかの、
  describe '#create' do #createメソッド、という意味。グループにしてまとめてるだけ。自分がターミナル上で確認するだけなので、rails的にはなんでも良い
    context 'can save' do
      it "is valid with text, image, group_id, user_id"

      it "is valid with text" do
        message = build(:message, image: nil)#user_id group_id に1を設定
        expect(message).to be_valid
      end
      it "is valid with image" do
        message = build(:message, text: nil)#user_id group_id に1を設定
        expect(message).to be_valid
      end
    end
    context 'can not save' do
      it "is invalid without text and image" do
        message = build(:message, text: nil, image: nil) #messageクラスのインスタンスを作成している。textが空となるよう指定。
        message.valid? #バリデーション（モデルクラスに記入するプロパティーの値の制限）によって保存できない状態であることを確かめる。真偽値を返し、エラーだとインスタンスのerrors(@messageを呼び出すメソッド)にハッシュの形でエラー文が保存される
        expect(message.errors[:text]).to include("を入力してください") #valid?メソッドを利用したインスタンスには、インスタンス変数@messageが追加される。ハッシュで、{カラム名:エラー文}という構造。errorメソッドでそれを呼び出し、includeメソッドで中の文字列が含まれているかを確かめ、含まれていればテストが通る。eq(hoge)メソッドは、引数と一致すればテストが通るという意味。
      end
      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group_id]).to include("を入力してください")
      end
      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user_id]).to include("を入力してください")
      end
    end
  end
end
