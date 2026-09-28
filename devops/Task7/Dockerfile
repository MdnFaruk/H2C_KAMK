FROM node:current-alpine3.11 as build
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8888
CMD ["node", "server.js"]


FROM python:slim
WORKDIR /app
RUN pip3 install --upgrade robotframework && \
    pip3 install --upgrade robotframework-seleniumlibrary && \
    pip3 install --upgrade webdrivermanager && \
    webdrivermanager firefox chrome --linkpath /usr/local/bin

COPY --from=build /app /app
CMD ["robot", "robotfw.robot"]

