const {database} = require('../config')

const createDb = `CREATE DATABASE IF NOT EXISTS ${database};`;

const useDatabase = `USE ${database};`;

const createProjectTable = `CREATE TABLE IF NOT EXISTS projects (
    project_id VARCHAR(36) PRIMARY KEY,
    project_name VARCHAR(100),
    created_by VARCHAR(100),
    created_on DATE,
    expected_completion_time DATE,
    description text
    );`



const createIssueTable = `CREATE TABLE IF NOT EXISTS issues (
    issue_id VARCHAR(36) PRIMARY KEY,
    issue_summary text,
    issue_description TEXT,
    issue_status VARCHAR(100),
    identified_by VARCHAR(100),
    assigned_to VARCHAR(100),
    issue_date DATE,
    issue_priority VARCHAR(100),
    project_id VARCHAR(36),    
    FOREIGN KEY(project_id) REFERENCES projects(project_id)    
    );`

    

const createCommentTable = `CREATE TABLE IF NOT EXISTS comments (
    comment_id VARCHAR(36) PRIMARY KEY,
    comment_message TEXT,
    comment_by VARCHAR(36),
    issue_id VARCHAR(36),
    FOREIGN KEY(issue_id) REFERENCES issues(issue_id)
    );`



module.exports = {
    createDb,
    useDatabase,
    createProjectTable,
    createIssueTable,
    createCommentTable
}