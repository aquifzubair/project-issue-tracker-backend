const {queryPromise,pool} = require('./dbConnection');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');


const checkUser = userName => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE user_userName = ?`
        pool.query(query,[userName], (err, result) => {
            if(err){
                logger.error(JSON.stringify(err));
                reject(err)
            } else {
                logger.info('fetched all the data from user table')
                resolve(result)
            }
        })
    })
}

const insertIntoUserTable = async (data) => {
    try {
        const query = "INSERT INTO `users` (user_id,user_name,user_userName,user_email,user_password,status) VALUES (?,?,?,?,?,?)"
        return new Promise((resolve,reject) => {
            pool.query(query, [uuidv4(), data.user_name, data.user_userName, data.user_email,data.user_password,'false'], (err, result) => {
                if(err) reject(err)
                    resolve(result)
                });
        })
        
    }
    catch(err){
        logger.error(err);
        throw err;
    }  
}

module.exports = {
    checkUser,
    insertIntoUserTable
}