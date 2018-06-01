FROM node:10.0.0

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN npm install
RUN npm run build
RUN npm run bootstrap

ENV TZ Australia/Melbourne

CMD ["scripts/start.sh"]

