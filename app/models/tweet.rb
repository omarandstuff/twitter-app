class Tweet < ApplicationRecord
  belongs_to :user
  belongs_to :quoted_tweet, optional: true, class_name: 'Tweet', foreign_key: 'quoted_tweet_id'
  has_many :quoter_tweets, class_name: 'Tweet', foreign_key: 'quoted_tweet_id'
  has_many :quoters, through: :quoter_tweets, source: :user
  has_many :likes
end
