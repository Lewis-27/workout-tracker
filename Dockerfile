FROM node:22

WORKDIR /app

COPY package*.json ./

COPY package*.json ./frontend/

RUN npm install

RUN npm install --prefix frontend

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "run", "dev"]