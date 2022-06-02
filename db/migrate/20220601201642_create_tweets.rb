class CreateTweets < ActiveRecord::Migration[7.0]
  def change
    create_table :tweets do |t|
      t.string :content
      t.references :user, null: false, index: true
      t.references :quoted_tweet, index: true, foreign_key: { to_table: :tweets }

      t.timestamps
    end
  end
end
