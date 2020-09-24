const {Router, json} = require('express');
const projectConnection =require('../database/project');

const { check, validationResult } = require('express-validator');
const routes = new Router();
const logger = require('../logger');

const validateEmpty = (name) => check(`${name}`).isLength({ min: 1 }).withMessage(`${name} Can't be empty`);


const validateDate = (date) => {
    return check(`${date}`).custom(value =>{
        const date = new Date(`${value}`)
        if(date < new Date()){
            throw new Error(`Date shouldn't be in past`)
        }
        return true;
    })
}


routes.get('/', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchAllProjects();
        logger.info('Project fetched Successfully')
        return res.status(200).json(results).end();
    }
    catch(err) {
        logger.error(JSON.stringify(err));
        next(new Error(`Internal server error, can't get list of all projects`))
    }
});

routes.post('/insert', [
    validateEmpty('project_name'),
    validateEmpty('created_by'),
    validateEmpty('description'),
    validateEmpty('created_on'),
    validateEmpty('expected_completion_time'),
    validateDate('created_on'),
    validateDate('expected_completion_time')    
    
] , async (req,res,next) =>{

    const errors = validationResult(req)
         if (!errors.isEmpty()) {
             logger.info(JSON.stringify(errors))
            return res.status(422).json({ errors: errors.array() })
         }
         
    try {
        await projectConnection.insertIntoProjects(req.body);
        logger.info('Project is added to the database')
        return res.status(200).json({message:'Project is added to the database'}).end();
    }
    catch(err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't insert data into project table`))
    }
})

routes.delete('/delete/:id', async (req,res,next) => {
    try {
        let results = await projectConnection.deleteRowFromProjectTable(`${req.params.id}`);
        logger.info('Project is deleted from database')
        return res.status(200).json({message:`Project is deleted from database`}).end();;
    }
    catch(err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't delete data from project table`))
    }
})

routes.put('/update/:id', [
    validateEmpty('project_name'),
    validateEmpty('created_by'),
    validateEmpty('description'),
    validateDate('expected_completion_time') 
]
,async (req,res,next) => {  
    const errors = validationResult(req)
         if (!errors.isEmpty()) {
            logger.info(JSON.stringify(errors))
            return res.status(422).json({ errors: errors.array() })
         }  

    try {
        let results = await projectConnection.updateRowFromTable(`${req.params.id}`,req.body );
        logger.info('project is updated to the database')
        return res.status(200).json({message:'Project is updated to the database'}).end();
    }
    catch(err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't update values in project table`))
    }
})

module.exports = routes;