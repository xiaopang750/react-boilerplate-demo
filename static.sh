#!/bin/bash

######上传
ssh root@192.168.1.13 "mkdir -p /newdata/www/vhosts/wishing/"
rsync -avzu --size-only --progress build/* root@192.168.1.13:/newdata/www/vhosts/wishing

git add "webpack-assets.json"
git add static
git add build
git commit -m "更新"${env}"静态文件"
git push
