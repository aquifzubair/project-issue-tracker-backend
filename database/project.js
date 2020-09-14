const {queryPromise,connection} = require('./dbConnection');
const { v4: uuidv4 } = require('uuid');


const fetchAllProjects = async () => {
    try {
        const query = 'SELECT * FROM projects;';
        const result = await queryPromise(query)
        return result
    }
    catch(err){
        throw err;
    }    
}

const insertIntoProjects = async (data) => {
    try {
        const query = "INSERT INTO `projects` (project_id,project_name,created_by,created_on,expected_completion_time,description) VALUES (?,?,?,?,?,?)"
        return new Promise((resolve,reject) => {
            connection.query(query, [uuidv4(), data.project_name, data.created_by, data.created_on,data.expected_completion_time,data.description], (err, result) => {
                if(err) reject(err)
                    resolve(result)
                });
        })
        
    }
    catch(err){
        throw err;
    }    

}

const deleteRowFromProjectTable = async (id) => {
    try {
        let query = `DELETE FROM projects WHERE project_id=?`        
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

const updateRowFromTable = async (id,data) => {
    try{
        let query = `UPDATE projects SET project_name=?,created_by=?, created_on=?, expected_completion_time=?,description=? WHERE project_id= ?`
        return new Promise((resolve,reject) => {
            connection.query(query, [data.project_name,data.created_by, data.created_on,data.expected_completion_time, data.description,  id], (err,result)=> {
                err ? reject(err) : resolve(result)
            })
        })
    }
    catch(err){
        throw err;
    }    
}


module.exports = {
    fetchAllProjects,
    insertIntoProjects,
    deleteRowFromProjectTable,
    updateRowFromTable
}