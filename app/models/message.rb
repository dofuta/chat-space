class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

#imageかtextのどちらか一方が無ければならない様にバリデーション
  validates :text, presence: true,  unless: :image?
  validates :image, presence: true, unless: :text?

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
