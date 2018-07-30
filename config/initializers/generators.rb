#rails g controllerを行うときの、デフォルトで生成されるファイルの設定。このファイルごと新しく作成した。

Rails.application.config.generators do |g|
  g.stylesheets false
  g.javascripts false
  g.helper false
  g.template_engine :haml
  # g.test_framework :rspec, view_specs: false, helper_specs: false, fixture: true #よくわからない
  # g.fixture_replacement :factory_girl, dir: "spec/support/factories" #よくわからない
end
