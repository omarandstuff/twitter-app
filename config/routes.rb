Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      post 'log_in', to: 'authentication#log_in'
      post 'sign_up', to: 'authentication#sign_up'

      get 'tweets', to: 'tweets#index'
      post 'tweets', to: 'tweets#create'
      delete 'tweets/:id', to: 'tweets#destroy'

      post 'likes/:id', to: 'likes#create'
      delete 'likes/:id', to: 'likes#destroy'
    end
  end

  root 'application#entry'
  match '*path', to: 'application#entry', via: :get
end
