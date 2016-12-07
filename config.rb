###
# Page options, layouts, aliases and proxies
###

activate :directory_indexes
set :relative_links, false #should be true
set :images_dir, 'images'

activate :imgix, host: 'grazio.imgix.net', secure_url_token: 'DGu3z9g8q3pML74D', shard_strategy: :cycle

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end


activate :blog do |blog|
  blog.name = 'case'
  blog.prefix = 'case'
  blog.layout = 'case-layout'
  blog.permalink = ':title.html'
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

helpers do
  def imgix(url, imgattr)
    base_url = 'http://grazio.imgix.net/' + url + '?' + imgattr
    # "<img src='#{base_url}'>"
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css
  # Minify Javascript on build
  # activate :minify_javascript
end
