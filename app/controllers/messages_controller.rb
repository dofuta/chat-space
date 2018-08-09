class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    @messages = @group.messages
    @groups = current_user.groups.includes(:user)

  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      flash[:notice] = "メッセージを送信しました。"
      redirect_to group_messages_path
    else
      flash[:alert] = "メッセージを入力してください。"
      redirect_to action: :index
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
