class Tweet < ApplicationRecord
  belongs_to :user
  belongs_to :quoted_tweet, optional: true, class_name: 'Tweet', foreign_key: 'quoted_tweet_id'
  has_many :quoter_tweets, class_name: 'Tweet', foreign_key: 'quoted_tweet_id'
  has_many :quoters, through: :quoter_tweets, source: :user
  has_many :likes

  validates :content, presence: true, unless: :quoted_tweet_id?
  validate :quoted_tweet_exists

  def quoted_tweet_exists
    errors.add(:quoted_tweet, 'must be a valid tweet') unless quoted_tweet_id.nil? || Tweet.exists?(quoted_tweet_id)
  end
end
