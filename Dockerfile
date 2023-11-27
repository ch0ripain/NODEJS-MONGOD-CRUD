FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev
# CMD ["npm", "run", "dev"]