class AddCommentToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :comment, :text, comment: "投稿に関するコメント"
  end
end
