#!/usr/bin/env sh

# abort on errors
set -e

# build
echo 'STEP: building docs ...'
yarn build

echo 'STEP: Generating radar ...'
python radar.py

echo 'STEP: Move radar static ...'
mv dist public/radar

# navigate into the build output directory
cd public

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

echo 'STEP: Git committing ...'
git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
echo 'STEP: Git pushing ...'
git push -f https://github.com/alanland/alanland.github.io.git master:html-pages

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

echo "STEP: success."
