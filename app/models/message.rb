class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

#imageかtextのどちらか一方が無ければならない様にバリデーション
  validates :text, presence: true,  unless: :image?
  validates :image, presence: true, unless: :text?
  validates :group_id, presence: true
  validates :user_id, presence: true

  mount_uploader :image, ImageUploader

private

#バリデーションの条件分岐に使うメソッド
  def text?
    text.present?
  end

  def image?
    image.present?
  end
end
