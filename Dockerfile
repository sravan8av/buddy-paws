FROM --platform=linux/amd64 nginx:stable

COPY . /usr/share/nginx/html

EXPOSE 80
