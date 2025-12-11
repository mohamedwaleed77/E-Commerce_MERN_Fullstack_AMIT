FROM node:20.17.0

WORKDIR /usr/src/app

COPY . .

ARG NEXT_PUBLIC_IP_ADDRESS
ENV NEXT_PUBLIC_IP_ADDRESS=${NEXT_PUBLIC_IP_ADDRESS}

RUN npm install

RUN npm run build

EXPOSE 3005

CMD ["npm", "run", "start"]
