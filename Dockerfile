FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "DATABASE_URL=file:./dev.db" > .env

RUN npm run build

# Prisma
RUN npx prisma generate
RUN npm run db:migrate
RUN npm run db:seed

CMD ["npm", "start"]
