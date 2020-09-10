const express = require('express')
const app = express()

const { port } = require('../config')
const { createDatabaseAndTable } = require('../database/dbConnection');
const project = require('../routes/project')
const users = require('../routes/users')

createDatabaseAndTable();

app.use(express.json())

app.use('/projects',project)
app.use('/users',users)

app.listen(port || 3000, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})