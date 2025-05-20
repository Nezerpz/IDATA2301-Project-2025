# Both container stages need this argument
ARG BUILD_DIR=/tmp/rentalroulette_frontend_build
# Mentioning it after FROM includes it as defined here


# Build-stage
FROM docker.io/node:latest AS build
ARG BUILD_DIR
RUN mkdir -p ${BUILD_DIR}
ADD . ${BUILD_DIR}
WORKDIR ${BUILD_DIR}
ARG VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ARG VITE_BACKEND_URL=${VITE_BACKEND_URL}
# Skip tests here as db is not running yet
RUN npm install
RUN npm run build


# Package stage
FROM docker.io/nginx:latest
ARG BUILD_DIR
ARG APPDIR=/usr/share/nginx/html
WORKDIR ${APPDIR}
COPY --from=build ${BUILD_DIR}/dist/ .
