FROM node:22

WORKDIR /app

COPY package*.json ./

RUN mkdir -p ./frontend

COPY /frontend/package*.json ./frontend

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

CMD ["npm", "run", "start"]