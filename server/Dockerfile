FROM node:18

WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get install -y wget tar && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/ipfs

RUN ./install.sh
RUN ipfs init
RUN ipfs bootstrap rm --all
RUN mv /app/ipfs/swarm.key ~/.ipfs/swarm.key

WORKDIR /app

RUN npm install -g truffle
RUN npm install -g ganache

RUN npm install

EXPOSE 4001 5001 8080

CMD sh -c "ipfs daemon & ganache --deterministic & npm run dev"