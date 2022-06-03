class Api::V1::LikesController < ApplicationController
  before_action :authenticate_request
  before_action :set_tweet

  def create
    Like.where(tweet: @tweet, user: current_user).first_or_create

    head :ok
  end

  def destroy
    Like.find_by(tweet: @tweet, user: current_user)&.destroy

    head :ok
  end

  private

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end
end
