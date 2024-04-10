FROM node:18

WORKDIR /app

COPY ./my-app/ .

RUN npm install

RUN npm install react-router-dom 
RUN npm install axios
RUN npm install uuid
RUN npm install react-cool-form
RUN npm install js-cookie
RUN npm install --save react-tinder-card

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000