
FROM node:12-slim as base

ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /app
COPY package*.json ./
COPY .env .

RUN ls

RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends

RUN npm config list
RUN npm ci \
    && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["node", "server.js"]


# environment dev
FROM base as dev
ENV NODE_ENV=development
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends
RUN echo $PATH
RUN npm config list
RUN npm install --only=development \
    && npm cache clean --force
COPY . .
# USER node
CMD ["node", "server.js"]
# CMD ["nodemon", "server.js"]

FROM dev as test
# COPY . .

FROM test as pre-prod
RUN rm -rf ./tests && rm -rf ./node_modules

FROM base as prod
COPY --from=pre-prod /app /app
HEALTHCHECK CMD curl http://127.0.0.1:8080/api/ || exit 1