json.tweets @tweets do |tweet|
  json.id tweet.id
  json.content tweet.content
  json.reteets tweet.quoter_tweets.count
  json.likes tweet.likes.count
  json.created_at tweet.created_at

  if tweet.quoted_tweet
    json.quoted_tweet do
      json.id tweet.quoted_tweet.id
      json.content tweet.quoted_tweet.content
      json.reteets tweet.quoted_tweet.quoter_tweets.count
      json.likes tweet.quoted_tweet.likes.count
      json.created_at tweet.quoted_tweet.created_at
  
      json.user do
        json.id tweet.quoted_tweet.user.id
        json.name tweet.quoted_tweet.user.name
      end
    end
  end

  json.user do
    json.id tweet.user.id
    json.name tweet.user.name
  end
end