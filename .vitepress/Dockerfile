FROM nginx

COPY ./dist /data

RUN rm /etc/nginx/conf.d/default.conf

ADD ./docker/nginx.conf /etc/nginx/conf.d/
