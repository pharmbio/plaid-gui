FROM node:latest

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn
RUN yarn install


COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]