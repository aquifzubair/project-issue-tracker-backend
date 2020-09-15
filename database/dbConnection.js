const mysql = require('mysql');

const { host, user, password, database } = require('../config');
const databaseQuery = require('./creatDatabaseQuery')

let pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database
});


pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});

const queryPromise = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};


const createDatabaseAndTable = () => {
  const promiseArray = [
    queryPromise(databaseQuery.createDb),
    queryPromise(databaseQuery.useDatabase),
    queryPromise(databaseQuery.createProjectTable),
    queryPromise(databaseQuery.createIssueTable),
    queryPromise(databaseQuery.createCommentTable),
  ]

  Promise.all(promiseArray)
    .then(() => console.log(`databases and tables are created`))
    .catch(err => console.error(err))

}

module.exports = {
  pool,
  createDatabaseAndTable,
  queryPromise
};

