class MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = Group.find(params[:group_id]).messages
  end

  def create
    @group = Group.find(params[:group_id]) #この:group_idは、URIからとってきたので、文字列
    @message = @group.messages.new(message_params)
    if @message.save
      flash[:notice] = "メッセージを送信しました。"
      redirect_to group_messages_path
    else
      flash[:alert] = "メッセージを入力してください。"
      render action: :index
    end
  end


  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end
end
