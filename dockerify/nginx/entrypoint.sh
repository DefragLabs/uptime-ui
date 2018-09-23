#! /bin/bash

envsubst '${SERVER_NAME}' < /etc/nginx/conf.d/ui.tmpl > /etc/nginx/conf.d/ui.conf

nginx -g "daemon off;"