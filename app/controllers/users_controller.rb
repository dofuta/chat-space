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
    #検索。 current_userは表示させない。
    @users = User.where('name LIKE ?',"%#{params[:keyword]}%" ).where.not('id = ?', "#{current_user.id}")
    #jbuilderを返す
    render json: @users
  end

  private

  def user_params
    params.require(:user).permit(:name,:email)
  end
end
