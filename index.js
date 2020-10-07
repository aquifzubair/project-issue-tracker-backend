const express = require('express')
const app = express()
const cors = require('cors')

const { port } = require('./config')
const project = require('./routes/project')
const issues = require('./routes/issues')
const comments = require('./routes/comments')
const users = require('./routes/users')

const db = require('./Modals');

const logger = require('./logger');
app.use(cors())
app.use(express.json())

db.sequelize.sync()
.then(() => {
  logger.info('database connected')
  app.get('/', (req, res) => {
    res.send('Welcome to the back-end of project-issue-tracker')
  })
  
  app.use('/users', users)
  app.use('/projects',project);
  app.use('/issues',issues);
  app.use('/comments', comments)
  
  
  // this function will run when there would not be any routes available.
  app.use((req,res,next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
  })
  
  // Express Error handler
  app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
      error:{
        status:err.status || 500,
        message:err.message
      }
    })
  })

  
  app.listen(port || 3000, () => {
    logger.info(`Server is listening at ${port}`)
  })

})





