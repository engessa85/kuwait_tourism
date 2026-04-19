#!/bin/sh
set -e

CERT_PATH="/etc/letsencrypt/live/kuwaittourism.online/fullchain.pem"

if [ -f "$CERT_PATH" ]; then
  cp /etc/nginx/templates/default.prod.conf /etc/nginx/conf.d/default.conf
else
  cp /etc/nginx/templates/default.prod.bootstrap.conf /etc/nginx/conf.d/default.conf
fi

exec nginx -g 'daemon off;'
