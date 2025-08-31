class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts, comment: "投稿記事を管理するテーブル"  do |t|
      t.string :title, comment: "タイトル"
      t.text :content, comment: "本文"
      t.timestamps
    end
  end
end
