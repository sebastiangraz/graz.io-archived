mkdir -p dist

bundle install

bundle exec middleman contentful
bundle exec middleman build
