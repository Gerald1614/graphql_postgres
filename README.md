
adaptation of a tutorial for graphql+NodejS + express with connection to postgres: https://www.robinwieruch.de/graphql-apollo-server-tutorial/
I changed completly the access to postgres to remove dependency on Sequelize, and i also used ESM modules that are supported with Node v12.

I deployed both the app and postgres on Docker containers 
```
deploy and run in docker
docker-compose -f docker-compose.yml up --build

to reset postgres
docker-compose rm postgres
```
a branch called 'all typescript' is a typescript verison of the application with some tests added. to test the API without mocking, I built a 4th container that run the test againt the application. 