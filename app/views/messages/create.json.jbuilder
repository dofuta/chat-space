json.ignore_nil!
json.user_name @message.user.name
json.created_at simple_time(@message.created_at)
json.text @message.text
json.image_url @message.image.url
json.user_id @message.user_id
