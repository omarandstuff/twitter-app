class User < ApplicationRecord
  has_many :tweets, inverse_of: :user, dependent: :destroy

  validates :name, presence: true
  validates :email, uniqueness: true
  validates :email, email: true
  validates :password, presence: true

  def self.authenticate(params)
    if params[:token]
      user = User.find_by_id(params[:token])
    else
      user = User.find_by_email(params[:email])
      user && user.password == params[:password] ? user : false
    end
  end
end
