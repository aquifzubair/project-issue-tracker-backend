const mysql = require('mysql');

const { host, user, password } = require('../config');
const databaseQuery = require('./creatDatabaseQuery')

let connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
});

connection.connect(function(err) {
    if (err) {
    throw err;
    }    
    console.log('Connected to the MySQL server.');
});

const queryPromise = (query) => {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
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
    connection,
    createDatabaseAndTable,
    queryPromise
};

