require 'rails_helper'

describe Api::V1::AuthenticationController, type: :request do
  describe 'POST #log_in' do
    describe 'when providing right credentials' do
      it 'returns the user' do
        user = User.create email: 'david@twitter.com', password: 'secret'

        post '/api/v1/log_in', params: { email: 'david@twitter.com', password: 'secret' }, headers: { 'ACCEPT' => 'application/json' }
        post '/api/v1/log_in', params: { email: 'david@twitter.com', password: 'secret' }, headers: { 'ACCEPT' => 'application/json' }
        post '/api/v1/log_in', params: { email: 'david@twitter.com', password: 'secret' }, headers: { 'ACCEPT' => 'application/json' }
        post '/api/v1/log_in', params: { email: 'david@twitter.com', password: 'secret' }, headers: { 'ACCEPT' => 'application/json' }
        expect(response).to render_template('api/v1/authentication/log_in')
      end
    end

    describe 'when providing guffy token' do
      it 'returns the user' do
        user = User.create email: 'david@twitter.com', password: 'secret'

        post '/api/v1/log_in', params: { token: user.id }, headers: { 'ACCEPT' => 'application/json' }
        # expect(response).to render_template('api/v1/authentication/log_in')
      end
    end

    describe 'when providing wrong credentials' do
      it 'returns bad request' do
        user = User.create email: 'david@twitter.com', password: 'secret'

        post '/api/v1/log_in', params: { email: 'david@tango.io', password: 'bad' }, headers: { 'ACCEPT' => 'application/json' }
        expect(response).to_not render_template('api/v1/authentication/log_in')
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'POST #sign_up' do
    describe 'when providing good data' do
      it 'returns the user' do
        post '/api/v1/sign_up', params: { name: 'david', email: 'david@twitter.com', password: 'secret' }, headers: { 'ACCEPT' => 'application/json' }
        expect(response).to render_template('api/v1/authentication/sign_up')
      end
    end

    describe 'when providing wrong credentials' do
      it 'returns bad request' do
        post '/api/v1/sign_up', params: {}, headers: { 'ACCEPT' => 'application/json' }
        expect(response).to_not render_template('api/v1/authentication/sign_up')
        expect(response.status).to eq(400)
        expect(response.body).to include('is invalid')
      end
    end
  end
end