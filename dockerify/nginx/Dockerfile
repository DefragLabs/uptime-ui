FROM node:9.5.0
ENV SERVER_NAME ${SERVER_NAME}
RUN apt-get update && apt-get install -y vim nginx gettext
RUN mkdir -p /app/code
ADD . /app/code/
RUN cd /app/code && yarn install && yarn run build

RUN addgroup --system nginx \
	&& adduser --system --no-create-home --shell /bin/false --group --disabled-login nginx
COPY ./dockerify/nginx/nginx.conf /etc/nginx/nginx.conf

RUN cp /app/code/dockerify/nginx/ui.tmpl /etc/nginx/conf.d/ui.tmpl

WORKDIR /app/code

ENTRYPOINT /app/code/dockerify/nginx/entrypoint.sh