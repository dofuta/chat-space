FactoryGirl.define do
  factory :message do
    text       Faker::Lorem.sentence
    image      File.open('') #アセットコンパイルのために消した。
    user
    group
  end
end
