class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :text, presence: true
  mount_uploader :image, ImageUploader
end
