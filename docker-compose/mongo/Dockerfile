FROM mongo:latest

RUN apt-get update -y
RUN apt-get remove mongodb-org -y
RUN apt-get install mongodb -y
RUN mkdir -p ./data/db

ENV MONGO_INITDB_DATABASE petsdb
ENV MONGO_INITDB_ROOT_USERNAME jean
ENV MONGO_INITDB_ROOT_PASSWORD 123456

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js:ro

RUN service mongodb start -y

EXPOSE 27017