# Twitter demo App

This is a demo app, completely assambled with rails, the rails app serves the same react app using webpack within any route except for the ones that falls into the api routes like `/api/v1/tweets`.

# Getting started

After cloning the app make sure to have ruby `3.1.2` installed and then just:

```shell
bundle install
rails db:create db:migrate db:seed
```

Make sure to have yarn also installed in your system and then

```shell
yarn install
```

That will let the app ready for you to test, so just run:

```shell
rails server
```

now you can visit the app in your browser via http://localhost:3000

## Run the tests

```shell
bundle exec rspec spec
```

# Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/omarandstuff/game_of_life. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to be kind.

# License

The project is available as open source under the terms of the MIT License.