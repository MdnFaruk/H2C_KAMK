FROM ubuntu:18.04

COPY ./presidents.json /

RUN apt update

RUN apt install -y curl cowsay inetutils-ping

# This is a hack to keep the utility container up and running
CMD tail -f /dev/null