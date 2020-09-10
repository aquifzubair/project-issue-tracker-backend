const {database} = require('../config')

const createDb = `CREATE DATABASE IF NOT EXISTS ${database};`;

const useDatabase = `USE ${database};`;

const createProjectTable = `CREATE TABLE projects (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(100),
    created_by VARCHAR(100),
    description text
    );`

const createUserTable = `CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    project_id INT,
    FOREIGN KEY(project_id) REFERENCES projects(project_id)
    );`

const createIssueTable = `CREATE TABLE issues (
    issue_id INT PRIMARY KEY,
    issue_summary text,
    issue_description TEXT,
    issue_status VARCHAR(100),
    identified_by INT,
    assigned_to INT,
    issue_date DATE,
    project_id INT,
    FOREIGN KEY(project_id) REFERENCES projects(project_id),
    FOREIGN KEY(assigned_to) REFERENCES users(user_id), 
    FOREIGN KEY(identified_by) REFERENCES users(user_id)
    );`

const createCommentTable = `CREATE TABLE comments (
    comment_id INT PRIMARY KEY,
    comment_message TEXT,
    comment_by INT,
    issue_id INT,
    FOREIGN KEY(comment_by) REFERENCES users(user_id), 
    FOREIGN KEY(issue_id) REFERENCES issues(issue_id)
    );`

module.exports = {
    createDb,
    useDatabase,
    createProjectTable,
    createUserTable,
    createIssueTable,
    createCommentTable
}