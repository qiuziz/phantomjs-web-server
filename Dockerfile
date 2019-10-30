# Version 2

# 基础镜像
FROM nginx:stable-alpine

RUN echo "https://mirrors.aliyun.com/alpine/v3.9/main/" > /etc/apk/repositories

# 维护者信息
MAINTAINER https://github.com/qiuziz

ENV PHANTOMJS_VERSION 2.1.1

RUN apk add --update --no-cache curl supervisor && \
		mkdir -p /app /logs /etc/supervisord.d /var/log/supervisor && \
    curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/${PHANTOMJS_VERSION}/dockerized-phantomjs.tar.gz" | tar xz -C / && \ 
    curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2  | tar -jxvf - -C / && \
    cp phantomjs-${PHANTOMJS_VERSION}-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && \
    rm -fR phantomjs-${PHANTOMJS_VERSION}-linux-x86_64 && \
    apk del curl && \
		adduser -D -u 1000 nginx

COPY supervisord.conf /etc/supervisord.conf
COPY phantom.ini /etc/supervisord.d
COPY nginx.ini /etc/supervisord.d
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY . /app

EXPOSE 80 9001
# CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
