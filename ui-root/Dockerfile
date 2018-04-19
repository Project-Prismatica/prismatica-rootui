FROM jshimko/meteor-launchpad:latest

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
ADD ./rootui-docker-entrypoint.sh /rootui-docker-entrypoint.sh

RUN chmod 755 \
    /usr/local/bin/wait-for-it.sh \
    /rootui-docker-entrypoint.sh

CMD [ "/rootui-docker-entrypoint.sh", "node", "main.js" ]