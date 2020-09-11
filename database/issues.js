const {queryPromise,connection} = require('./dbConnection');
const { v4: uuidv4 } = require('uuid');


const fetchAllIssues = async () => {
    try {
        const query = 'SELECT * FROM issues;';
        const result = await queryPromise(query)
        return result
    }
    catch(err){
        throw err;
    }    
}

const insertIntoIssues = async (data) => {
    try {
        const query = "INSERT INTO `issues` (issue_id,issue_summary,issue_description,issue_status, identified_by, assigned_to, issue_date, project_id) VALUES (?,?,?,?,?,?,?,?)";
        const values = [uuidv4(), data.summary, data.description, data.status, data.identified_by, data.assigned_to,data.issue_date, data.project_id];
        return new Promise((resolve,reject) => {
            connection.query(query, values, (err, result) => {
                if(err) reject(err)
                    resolve(result)
                });
        })
        
    }
    catch(err){
        throw err;
    }    

}

const deleteRowFromIssuesTable = async (id) => {
    try {
        let query = `DELETE FROM issues WHERE issue_id=?`        
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

const updateRowFromIssuesTable = async (id,data) => {
    console.log(data)
    try{
        let query = `UPDATE issues SET issue_summary=?,issue_description=?,issue_status=?, identified_by=?, assigned_to=?, issue_date=?, project_id=? WHERE issue_id=?`
        return new Promise((resolve,reject) => {
            connection.query(query, [data.summary || null, data.description || null ,data.status || null, data.identified_by || null, data.assigned_to || null, data.issue_date || null, data.project_id || null, id], (err,result)=> {
                err ? reject(err) : resolve(result)
            })
        })
    }
    catch(err){
        throw err;
    }    
}


module.exports = {
    fetchAllIssues,
    insertIntoIssues,
    deleteRowFromIssuesTable,
    updateRowFromIssuesTable
}