class Post < ApplicationRecord
  # self.table_name = "my_posts"  # 上書き可能
  validates :title, presence: true
  validates :content, presence: true
end
