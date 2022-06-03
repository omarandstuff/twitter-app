require 'rails_helper'

describe Api::V1::TweetsController, type: :request do
  describe 'GET #index' do
    describe 'when not porviding a user id' do
      it 'reurns all tweets in app' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        user2 = User.create name: 'omar', email: 'omar@twitter.com', password: 'secret'
        tweet1 = Tweet.create(content: '1', user: user)
        tweet2 = Tweet.create(content: '2', user: user2)

        get '/api/v1/tweets', params: {}, headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response).to render_template('api/v1/tweets/index')
        expect(response.body).to include("\"id\":#{tweet1.id}")
        expect(response.body).to include("\"id\":#{tweet2.id}")
      end
    end

    describe 'when porviding a user id' do
      it 'reurns all user tweets' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        user2 = User.create name: 'omar', email: 'omar@twitter.com', password: 'secret'
        tweet1 = Tweet.create(content: '1', user: user)
        tweet2 = Tweet.create(content: '2', user: user2)

        get '/api/v1/tweets', params: { user_id: user.id }, headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response).to render_template('api/v1/tweets/index')
        expect(response.body).to include("\"id\":#{tweet1.id}")
        expect(response.body).to_not include("\"id\":#{tweet2.id}")
      end
    end
  end

  describe 'POST #create' do
    describe 'when not porviding a user id' do
      it 'reurns the created tweet' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'

        post '/api/v1/tweets', params: { tweet: { content: 'This is a tweet' } }, headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response).to render_template('api/v1/tweets/create')
        expect(Tweet.count).to eq(1)
      end
    end

    describe 'creating a retweet' do
      it 'reurns the created quoter tweet' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        quoted_tweet = Tweet.create(content: '1', user: user)

        post '/api/v1/tweets', params: { tweet: { content: 'This is a tweet', quoted_tweet_id: quoted_tweet.id } }, headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response).to render_template('api/v1/tweets/create')
        expect(Tweet.count).to eq(2)
        expect(Tweet.last.quoted_tweet).to eq(quoted_tweet)
      end
    end

    describe 'creating a retweet but the provided id does not exists' do
      it 'reurns bad requerst' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        quoted_tweet = Tweet.create(content: '1', user: user)

        post '/api/v1/tweets', params: { tweet: { quoted_tweet_id: '0'} }, headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response).to_not render_template('api/v1/tweets/create')
        expect(response.body).to include('')
        expect(Tweet.count).to eq(1)
      end
    end
  end

  describe 'POST #destroy' do
    describe 'when destroying a users tweet' do
      it 'destroys the tweet' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        tweet = Tweet.create(content: '1', user: user)

        delete "/api/v1/tweets/#{tweet.id}", headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response.status).to eq(200)
        expect(Tweet.count).to eq(0)
      end
    end

    describe 'when destroying a not users tweet' do
      it 'destroys bad request' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        not_user = User.create name: 'omar', email: 'omar@twitter.com', password: 'secret'
        tweet = Tweet.create(content: '1', user: not_user)

        delete "/api/v1/tweets/#{tweet.id}", headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response.status).to eq(400)
        expect(Tweet.count).to eq(1)
      end
    end
  end
end
