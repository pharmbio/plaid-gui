FROM node:latest

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

#  Install yarn explicitly
RUN npm install -g yarn
RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]