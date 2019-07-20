FROM node:8-stretch

RUN git clone https://github.com/yonmey/expressio-bot.git
ARG TTOKEN
ENV BOT_TOKEN=$TTOKEN
RUN cd expressio-bot && npm install && npm run-script build
WORKDIR /expressio-bot