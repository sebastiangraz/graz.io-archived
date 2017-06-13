# Copy static site, Current/Path working directory 
CWD=`pwd`

# Clone Pages repository
cd /tmp
git clone https://github.com/umbriel/portfolio-prototype.git build

# cd build && git checkout -b YOUR_BRANCH origin/YOUR_BRANCH # If not using master

# Trigger Middleman rebuild
cd $CWD
bundle exec middleman contentful --rebuild

# Push newly built repository
cp -r $CWD/build/* /tmp/build

cd /tmp/build

git config --global user.email "graz@live.se"
git config --global user.name "umbriel"

git add .
git commit -m "Automated Rebuild"
git push -f origin master
