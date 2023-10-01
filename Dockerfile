# Common build stage
FROM node:16.5.0
#ENV http_proxy=http:...
#ENV https_proxy=http:...
COPY . ./app

WORKDIR /app

RUN npm install
RUN npm run build


#EXPOSE 3000

ENV NODE_ENV staging
ENV TZ=Asia/Kathmandu 
RUN rm -f /app/src/config/resources/config.yaml
CMD ["npm", "run", "start"]
