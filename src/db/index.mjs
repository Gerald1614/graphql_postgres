import pg from 'pg';

const config = {
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});
export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}