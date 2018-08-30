class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
      flash[:notice] = "アカウントが登録されました。"
    else
      render action: :edit
      flash[:alart] = "登録できませんでした。"
    end
  end

  def index
    @users = User.where('name LIKE ?',"%#{params[:keyword]}%" )
    render :json
  end

  private

  def user_params
    params.require(:user).permit(:name,:email)
  end
end
