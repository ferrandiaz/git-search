FROM mhart/alpine-node:6.9.1

ENV HOME /app
WORKDIR $HOME

COPY package.json ${HOME}/
COPY src/ ${HOME}/src
COPY entrypoint.sh /

RUN npm install --production
RUN chmod 755 /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
