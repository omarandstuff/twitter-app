require 'rails_helper'

describe Api::V1::LikesController, type: :request do
  describe 'POST #create' do
    describe 'when not liked before' do
      it 'likes the tweet' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        tweet = Tweet.create(content: 'tweet', user: user)

        post "/api/v1/likes/#{tweet.id}", headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response.status).to eq(200)
        expect(Like.count).to eq(1)
        expect(tweet.likes.count).to eq(1)
      end
    end

    describe 'when liked before' do
      it 'does nothing' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        tweet = Tweet.create(content: 'tweet', user: user)
        Like.create(tweet: tweet, user: user)

        post "/api/v1/likes/#{tweet.id}", headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response.status).to eq(200)
        expect(Like.count).to eq(1)
        expect(tweet.likes.count).to eq(1)
      end
    end
  end

  describe 'POST #destroy' do
    describe 'when already liked tweet' do
      it 'destroys the like' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        tweet = Tweet.create(content: 'tweet', user: user)
        Like.create(tweet: tweet, user: user)

        delete "/api/v1/likes/#{tweet.id}", headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response.status).to eq(200)
        expect(Like.count).to eq(0)
        expect(tweet.likes.count).to eq(0)
      end
    end

    describe 'when not liked' do
      it 'does nothing' do
        user = User.create name: 'david', email: 'david@twitter.com', password: 'secret'
        tweet = Tweet.create(content: 'tweet', user: user)

        delete "/api/v1/likes/#{tweet.id}", headers: { 'ACCEPT' => 'application/json', 'AUTHORIZATION' => "Goofy #{user.id}" }
        expect(response.status).to eq(200)
        expect(Like.count).to eq(0)
        expect(tweet.likes.count).to eq(0)
      end
    end
  end
end
