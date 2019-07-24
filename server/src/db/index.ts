import pg from 'pg';

const pool = new pg.Pool();

pool.on('connect', () => {
  console.log('connected to the Database');
});

const queryText3 = 
`COPY users
FROM './utils/initiateDBusers' DELIMITER ',' CSV HEADER;`;

const queryText4 = 
`COPY creditcards
FROM './utils/initiateDBcc' DELIMITER ',' CSV HEADER;`;

const executeQuery = (query) => {
  pool.query(query)
    .then((res) => {
      console.log('tables created');
    })
    .catch((err) => {
      console.log(err);
    });
}

// executeQuery(queryText3);
// executeQuery(queryText4);

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}