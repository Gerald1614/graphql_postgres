"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool();
pool.on('connect', () => {
    console.log('connected to the Database');
});
const queryText1 = `CREATE TABLE IF NOT EXISTS
    users(
      id VARCHAR(40) PRIMARY KEY,
      username VARCHAR(40)
    )`;
const queryText2 = `CREATE TABLE IF NOT EXISTS
    creditcards(
      cardid VARCHAR(40) PRIMARY KEY,
      cardnumber VARCHAR(128),
      userid VARCHAR(40) REFERENCES users(id) ON DELETE CASCADE
    )`;
const createTables = (query) => {
    pool.query(query)
        .then((res) => {
        console.log('tables created');
    })
        .catch((err) => {
        console.log(err);
    });
};
createTables(queryText1);
createTables(queryText2);
exports.default = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};
//# sourceMappingURL=index.js.map