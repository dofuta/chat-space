class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?
  #devise関連の時だけアクションが作動する。deviseのヘルパーメソッドの１つ

  protected

  def configure_permitted_parameters
    # sign_upのときに、nameも許可する
      devise_parameter_sanitizer.permit(:sign_up, keys:[:name])
    #account_updateのときに、nameも許可する
      devise_parameter_sanitizer.permit(:account_update, keys:[:name])
  end
end
