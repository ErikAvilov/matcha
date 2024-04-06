FROM node:18

WORKDIR /app

COPY ./my-app/ .

RUN npm install

RUN npm install react-router-dom 
RUN npm install axios
RUN npm install uuid

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000