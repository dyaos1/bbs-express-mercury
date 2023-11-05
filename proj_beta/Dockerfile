FROM node:18-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
CMD npm run start
# CMD npm run reset && npm run start
# RUN chmod +x ./docker-entrypoint.sh
# ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
EXPOSE 3000