FROM --platform=linux/arm64 nginx:stable
COPY . /usr/share/nginx/html
EXPOSE 80
