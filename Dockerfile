FROM node:16.20.0 as node
LABEL MAINTAINER thomas.dickhut@gfi.ihk.de

USER root
RUN npm install -g @angular/cli@15

WORKDIR /tmp
COPY . .

USER $USERNAME

SHELL ["/bin/bash", "-c"]
RUN npm install && \
    npm run build-prod && \
    cd dist && \
    ls -a && \
    cd ..

FROM nginx:stable-alpine3.17-slim
LABEL MAINTAINER thomas.dickhut@gfi.ihk.de
EXPOSE 8080

USER root

RUN mkdir -p /run/nginx && mkdir -p /var/www/html
COPY nginx.conf /etc/nginx/
COPY --from=node /tmp/dist /var/www/html

RUN find /var/www/html/ -type f -regex ".*\.\(html\|js\|css\)" -exec sh -c "gzip < {} > {}.gz" \;
RUN ls -al /var/www/* -R && \
    cat /etc/nginx/nginx.conf

USER $USERNAME
ENV HOME=/var/www/
WORKDIR $HOME
CMD ["sh", "-c", "exec nginx -g 'daemon off; '"]