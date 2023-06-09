FROM node:14

# Author
MAINTAINER Nicolas Flores & Martin Mulone

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# copy environments targets
COPY .env ./
COPY .env.mocTestnetAlpha ./
COPY .env.mocTestnet ./
COPY .env.mocMainnet2 ./
COPY .env.rdocTestnetAlpha ./
COPY .env.rdocTestnet ./
COPY .env.rdocMainnet ./

# build script target
COPY build_target.sh ./
COPY prepare_target.sh ./

CMD /bin/bash -c 'bash ./build_target.sh'
