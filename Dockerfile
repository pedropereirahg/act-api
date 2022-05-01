FROM node:14.17.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i -g @nestjs/cli

RUN npm i --only=prod

COPY . .

RUN npm run build

RUN npm uninstall typescript @nestjs/cli

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
