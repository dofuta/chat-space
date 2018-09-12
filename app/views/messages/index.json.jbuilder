json.array! @messages do |message|
  json.user_name @message.user.name
  json.created_at simple_time(@message.created_at)

  json.ignore_nil!
  json.text @message.text

  json.ignore_nil!
  json.image_url @message.image.url
end
