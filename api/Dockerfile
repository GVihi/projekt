FROM node:14

WORKDIR /home/projekt/api

COPY package.json .

RUN npm install
RUN apt-get update || : && apt-get install python -y
RUN apt-get install python3-pip -y
RUN pip3 install Pillow

COPY . .

EXPOSE 8000

VOLUME [ "/home/projekt/api/node_modules" ]

CMD ["npm", "start"]