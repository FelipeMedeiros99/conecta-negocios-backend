FROM node:20
WORKDIR /app
COPY *.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build 
CMD [ "npm", "start:prod" ]