const express = require('express')
const app = express()

const { port } = require('../config')
const createDatabaseAndTable = require('../database/dbConnection');

createDatabaseAndTable();

app.get('/', (req, res) => {
  res.send('working')
})

app.listen(port || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})