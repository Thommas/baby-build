#!/bin/bash

for locale in en fr ja; do
  echo "Deploying: $locale"
  echo -e "User-agent: *\nDisallow: /" > ../frontend/build/staging/$locale/robots.txt
  aws s3 sync --delete ../frontend/build/staging/$locale s3://pathofchild-staging-$locale
done
