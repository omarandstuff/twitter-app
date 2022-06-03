class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  attr_reader :current_user

  def entry
    render html: '', layout: true
  end

  protected

  def authenticate_request
    @current_user = User.find_by_id(request_authorization_token)
    head :unauthorized unless @current_user
  end

  private

  def request_authorization_token
    request.headers['Authorization']&.split&.last
  end
end
