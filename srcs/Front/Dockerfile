FROM node:18

WORKDIR /app

COPY ./my-app/ .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000