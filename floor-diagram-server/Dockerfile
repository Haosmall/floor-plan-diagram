FROM node:14

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD [ "node", "src/index.js" ]

HEALTHCHECK --interval=30s --retries=5 CMD curl --fail http://localhost/api/health || exit 1