import pg from 'pg';

const pool = new pg.Pool();

pool.on('connect', () => {
  console.log('connected to the Database');
});

const queryText1 =
    `CREATE TABLE IF NOT EXISTS
      users(
        id VARCHAR(40) PRIMARY KEY,
        username VARCHAR(40),
        messages VARCHAR(40)[]
      )`;
      const queryText2 =
    `CREATE TABLE IF NOT EXISTS
      messages(
        id VARCHAR(40) PRIMARY KEY,
        text VARCHAR(40),
        userid VARCHAR(40)
      )`;
const createTables = (query) => {
  pool.query(query)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

createTables(queryText1);
createTables(queryText2);

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}