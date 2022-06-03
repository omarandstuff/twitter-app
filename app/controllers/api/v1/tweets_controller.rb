class Api::V1::TweetsController < ApplicationController
  before_action :authenticate_request
  before_action :set_tweet, only: [:destroy]

  def index
    user = User.find_by_id(params[:user_id])

    if user
      @tweets = user.tweets
    else
      @tweets = Tweet.all
    end
  end

  def create
    @tweet = Tweet.new(tweet_params)
    @tweet.user = current_user

    render json: @tweet.errors.messages, status: :bad_request unless @tweet.save
  end

  def destroy
    if @tweet && @tweet.user == current_user
      @tweet.destroy

      head :ok
    else
      head :bad_request
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:content, :quoted_tweet_id)
  end

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end
end
