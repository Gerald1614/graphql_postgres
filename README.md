
adaptation of a tutorial for graphql+NodejS + express with connection to postgres: https://www.robinwieruch.de/graphql-apollo-server-tutorial/
I changed completly the access to postgres to remove dependency on Sequelize, and i also used ESM modules that are supported with Node v12.

I deployed both the app and postgres on Docker containers 
```
deploy and run in docker
docker-compose -f docker-compose.yml up --build

to reset postgres
docker-compose rm postgres
```
a branch called 'all typescript' is a typescript version of the application with some tests added. to test the API without mocking, I built a 4th container that run the test againt the application. instead of using console.log, i reinject a new topic to collect new transactiosn as well as the result of the fraud analyst.
I installed MQTTbox on my desktop to subscribe to those topics and check that the applciation behaves as expected.

