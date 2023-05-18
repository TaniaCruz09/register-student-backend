FROM node
COPY . /registro-notas-escolares
WORKDIR /registro-notas-escolares
RUN npm install
CMD ["npm", "run", "start:dev"]