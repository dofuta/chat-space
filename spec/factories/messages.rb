FactoryGirl.define do
  factory :message do
    text       Faker::Lorem.sentence
    image      File.open('./public/uploads/message/image/10/IMG_6350.jpg')
    user
    group
  end
end
