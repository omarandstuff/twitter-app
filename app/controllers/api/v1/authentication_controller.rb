class Api::V1::AuthenticationController < ApplicationController
  def log_in
    @user = User.authenticate(log_in_params)

    head :unauthorized if !@user
  end

  def sign_up
    @user = User.new(sign_up_params)

    unless @user.save
      render json: @user.errors.messages, status: :bad_request
    end
  end

  private

  def log_in_params
    params.permit(:email, :password, :token)
  end

  def sign_up_params
    params.permit(:name, :email, :password)
  end
end
