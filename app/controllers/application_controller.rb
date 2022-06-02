class ApplicationController < ActionController::Base
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
