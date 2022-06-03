first_user = User.create!(name: 'david', email: 'david@twitter.com', password: '12345678')
second_user = User.create!(name: 'david', email: 'omar@twitter.com', password: '12345678')

first_tweet = Tweet.create!(content: 'This is a tweet', user: first_user)

first_qouter_tweet = Tweet.create!(quoted_tweet: first_tweet, user: second_user)

Like.create!(tweet: first_qouter_tweet, user: first_user)
