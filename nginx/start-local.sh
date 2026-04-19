#!/bin/sh
set -e

cp /etc/nginx/templates/default.local.conf /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
