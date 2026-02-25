FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN cd frontend && npm install && cd ..

COPY . .

EXPOSE 5000

RUN npm run build

CMD ["npm", "run", "server"]