###
# Page options, layouts, aliases and proxies
###

activate :directory_indexes

set :relative_links, false  #should be true
set(:port, 5678)
set :images_dir, 'images'
set :js_dir, 'assets/javascript'
set :css_dir, 'assets/stylesheets'

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true, auto_ids: false

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/404.html", directory_index: false

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

# activate :external_pipeline,
#   name: :npm,
#   command: "npm run start",
#   source: ".tmp"

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
  def markdown(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    return markdown.render(text).html_safe
  end
  def hex_to_rgb(input)
    a = ( input.match /#(..?)(..?)(..?)/ )[1..3]
    a.map!{ |x| x + x } if input.size == 4
    return "rgba(#{a[0].hex},#{a[1].hex},#{a[2].hex}, .25)"
  end
  def darken_color(hex_color, amount=0.4)
    hex_color = hex_color.gsub('#','')
    rgb = hex_color.scan(/../).map {|color| color.hex}
    rgb[0] = (rgb[0].to_i * amount).round
    rgb[1] = (rgb[1].to_i * amount).round
    rgb[2] = (rgb[2].to_i * amount).round
    "#%02x%02x%02x" % rgb
  end
  def imageRatioCalc(image)
    imageSize = FastImage.size("http:#{image}")
    width = imageSize[0]
    height = imageSize[1]
    calc = height.fdiv(width) * 100 # 1.33%
    return paddingBottom = calc.to_i
    # aspectRatio = calc.to_r.rationalize(Rational('0.001'))
  end
end

class CustomMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super
    context.content_type_id = entry.content_type.id
    context.updated_at = entry.sys[:updatedAt].strftime("%b #{entry.sys[:updatedAt].day.ordinalize} — %Y")
    context.slug = entry.title.parameterize
  end
end

activate :contentful do |f|
  f.access_token = 'e300c3de976fa349df685a08973ded272eb0cbb2dd3423ba2ee48753e1bc4ac5'
  f.space = { site: 'y77stanzu634'}
  f.rebuild_on_webhook = true
  f.cda_query = { limit: 1000 }
  f.content_types = {
    blog: {mapper: CustomMapper, id: 'blog'},
    caseStudy: {mapper: CustomMapper, id: 'caseStudy'},
    textTemplate: {mapper: CustomMapper, id: 'textTemplate'},
    cvTemplate: {mapper: CustomMapper, id: 'cvTemplate'}
  }
end

# Dir.exist?(config.data_dir) checks if the data exists, needed for freshly closed repos
if Dir.exist?(config.data_dir)
  data.site.caseStudy.each do | id, this |
    proxy "/casestudy/#{this.slug}/index.html", "/casestudy/cases-template.html", :locals => { this: this }, :ignore => true
  end
end

if Dir.exist?(config.data_dir)
  data.site.blog.each do | id, this |
    proxy "/blog/#{this.slug}/index.html", "/blog/blog-template.html", :locals => { this: this }, :ignore => true
  end
end

activate :external_pipeline,
           name: :webpack,
           command: build? ? "yarn run build" : "yarn run start",
           source: ".tmp/dist",
           latency: 1



# Build-specific configuration
# configure :build do
#   # Minify CSS on build
#   activate :minify_css
#   # Minify Javascript on build
#   activate :minify_javascript
# end
