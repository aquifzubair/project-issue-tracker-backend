const {queryPromise,connection} = require('./dbConnection');
const { v4: uuidv4 } = require('uuid');


const fetchAllUsers = async () => {
    try {
        const query = 'SELECT * FROM users;';
        const result = await queryPromise(query)
        return result
    }
    catch(err){
        throw err;
    }    
}

const insertIntoUsers = async (data) => {
    try {
        const query = "INSERT INTO `users` (user_id,user_name,user_email,project_id) VALUES (?,?,?,?)";
        return new Promise((resolve,reject) => {
            connection.query(query, [uuidv4(), data.name, data.email, data.project_id], (err, result) => {
                if(err) reject(err)
                    resolve(result)
                });
        })
        
    }
    catch(err){
        throw err;
    }    

}

const deleteRowFromUsersTable = async (id) => {
    try {
        let query = `DELETE FROM users WHERE user_id=?`        
        return new Promise((resolve,reject) => {
            connection.query(query, id, (err,result)=> {
                err ? reject(err) : resolve(result)
            })
        })
    }
    catch(err){
        throw err;
    }    
}

const updateRowFromUsersTable = async (id,data) => {
    console.log(data,'data')
    try{
        let query = `UPDATE users SET user_name= ?,user_email= ?, project_id= ? WHERE user_id= ?`
        return new Promise((resolve,reject) => {
            connection.query(query, [data.user_name || null, data.user_email || null ,data.project_id || null, id], (err,result)=> {
                err ? reject(err) : resolve(result)
            })
        })
    }
    catch(err){
        throw err;
    }    
}

module.exports = {
    fetchAllUsers,
    insertIntoUsers,
    deleteRowFromUsersTable,
    updateRowFromUsersTable
}