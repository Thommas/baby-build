#!/bin/bash

for locale in en fr ja; do
  echo "Deploying: $locale"
  echo -e "User-agent: *\nAllow: /" > ../frontend/build/production/$locale/robots.txt
  cp sitemap.$locale.xml ../frontend/build/production/$locale/sitemap.xml
  aws s3 sync --delete ../frontend/build/production/$locale s3://pathofchild-production-$locale
done
