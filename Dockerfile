FROM node:20
WORKDIR /app
COPY *.json .
RUN npm install
COPY . .
RUN npm run build 
RUN npx prisma migrate dev
RUN npx prisma generate
CMD [ "npm", "start:prod" ]