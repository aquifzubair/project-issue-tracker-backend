const mysql = require('mysql');
const projectData = require('../data/project.json')
const { v4: uuidv4 } = require('uuid');

const { host, user, password, database } = require('../config');
const databaseQuery = require('./creatDatabaseQuery');
const logger = require('../logger');

let pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
});


pool.on('connection', function (connection) {
  logger.info('DB Connection established');

  connection.on('error', function (err) {
    logger.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    logger.error(new Date(), 'MySQL close', err);
  });

});


const InsertData = `INSERT INTO projects(project_id,project_name,created_by,created_on,expected_completion_time,description) VALUES
                    ('${uuidv4()}','${projectData[0].project_name}','${projectData[0].created_by}','${projectData[0].created_on}','${projectData[0].expected_completion_time}','${projectData[0].description}'),
                    ('${uuidv4()}','${projectData[1].project_name}','${projectData[1].created_by}','${projectData[1].created_on}','${projectData[1].expected_completion_time}','${projectData[1].description}'),
                    ('${uuidv4()}','${projectData[1].project_name}','${projectData[2].created_by}','${projectData[2].created_on}','${projectData[2].expected_completion_time}','${projectData[2].description}')
                    `

const loadProjectData = async () => {

  try{
    const data = await queryPromise('SELECT * FROM projects')  

    if(data.length == 0 || data[0].num_of_rows == 1 ){      
      await queryPromise(InsertData)
      logger.info('data is inserted into project table')
    }

    else {
      logger.info('Data is Already present in project Table')
    }
  }

  catch(err){
    logger.error(err)
    throw err;
  }
  
};


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


const  createDatabaseAndTable = async () => {

  try{
    await queryPromise(databaseQuery.createDb)
    logger.info('Database created')
  }
  catch(err){
    logger.error(err)
    throw err;
  }

  try{
    await queryPromise(databaseQuery.useDatabase)
    logger.info('Using database')
  }
  catch(err){
    logger.error(err)
    throw err;
  }

  try{
    await queryPromise(databaseQuery.createProjectTable)
    await queryPromise(databaseQuery.createIssueTable)
    await queryPromise(databaseQuery.createCommentTable)
    logger.info('all tables are created')
  }
  catch(err){
    logger.error(err)
    throw err;
  }

  try{
    await loadProjectData()
  }
  catch(err){
    console.error(err)
  }

}

module.exports = {
  pool,
  createDatabaseAndTable,
  queryPromise
};

