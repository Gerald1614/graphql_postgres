
adaptation of a tutorial for graphql+NodejS + express with connection to postgres: https://www.robinwieruch.de/graphql-apollo-server-tutorial/
I changed completly the acces to postgres to remove dependecny on Sequelize, and i also used ESM modules that are supported with Node v12

I deployed both the app and postgres on Docker containers 
```
deploy and run in docker
docker-compose -f docker-compose.yml up --build

to reset postgres
docker-compose rm postgres
```