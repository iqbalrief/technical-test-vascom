## Install
--- npm install

## Setup .env 
---DB_USERNAME=
---DB_PASSWORD=
---DB_DATABASE=
---HOST=
---PORT= 8080
---JWT_SECRETKEY= 

## Create DB
--- npx-sequelize-cli db:crate

## Migrate
--- npx-sequelize-cli db:migrate
--- npx-sequelize-cli db:migrate:undo:all

## Seed
--- npx-sequelize-cli db:seed:all
--- npx-sequelize-cli db:undo:all

## Drop DB
-- npx-sequelize-cli db:drop


## RUN
-- npm run start

![alt text](https://github.com/iqbalrief/eventWellnest/blob/0a2be96af3b0f5193a3837be9f2fec46223bce98/server/images/appsWellnest.png)


## .ENV
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
HOST=localhost
PORT=8080
JWT_SECRETKEY=
