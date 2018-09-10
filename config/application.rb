require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Chatspace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.i18n.default_locale = :ja

    # フォーム送信後自動でformのタグにdisabledが追加されて無効化されるのを解除する。
    config.action_view.automatically_disable_submit_tag = false

    #タイムゾーンを日本時間に設定
    config.time_zone = 'Asia/Tokyo'

    #field_with_errorsのdivが勝手に吐き出されるのを防ぐ（レイアウトが崩れるため）
    config.action_view.field_error_proc = Proc.new do |html_tag, instance|
      %Q(#{html_tag}).html_safe
    end
  end
end
