# -- BUILD --
FROM node:12.18.0 as build

WORKDIR /usr/src/app

COPY package* ./
COPY . .

RUN npm i
RUN npm run build

# -- RELEASE --
FROM nginx:stable-alpine as release

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# copy .env as .env to the release build
COPY --from=build /usr/src/app/.env.example /usr/share/nginx/html/.env
COPY --from=build /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf

# install nodejs & npm
RUN apk add --update nodejs
RUN apk add --update npm

RUN npm i -g runtime-env-cra@0.2.0

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
