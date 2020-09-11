const {queryPromise,connection} = require('./dbConnection');
const { v4: uuidv4 } = require('uuid');


const fetchAllComments = async () => {
    try {
        const query = 'SELECT * FROM comments;';
        const result = await queryPromise(query)
        return result
    }
    catch(err){
        throw err;
    }    
}

const insertIntoComments = async (data) => {
    try {
        const query = "INSERT INTO `comments` (comment_id,comment_message,comment_by,issue_id) VALUES (?,?,?,?)"
        return new Promise((resolve,reject) => {
            connection.query(query, [uuidv4(), data.message, data.comment_by, data.issue_id], (err, result) => {
                if(err) reject(err)
                    resolve(result)
                });
        })
        
    }
    catch(err){
        throw err;
    }    

}

const deleteRowFromCommentsTable = async (id) => {
    try {
        let query = `DELETE FROM comments WHERE comment_id=?`        
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

const updateRowFromCommentsTable = async (id,data) => {
    try{
        let query = `UPDATE comments SET comment_message=?,comment_by=?, issue_id=? WHERE comment_id= ?`
        return new Promise((resolve,reject) => {
            connection.query(query, [data.message,data.comment_by, data.issue_id,  id], (err,result)=> {
                err ? reject(err) : resolve(result)
            })
        })
    }
    catch(err){
        throw err;
    }    
}
module.exports = {
    fetchAllComments,
    insertIntoComments,
    deleteRowFromCommentsTable,
    updateRowFromCommentsTable
}