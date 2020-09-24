const { Router } = require('express');
const projectConnection = require('../database/issues');

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

routes.get('/', async (req, res, next) => {
    
    try {
        let results = await projectConnection.fetchAllIssues();
        logger.info(`Issues is fetched`)
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err)
        next(new Error(`Internal server error, can't get list of all Issues`))
    }
});

routes.get('/:project_id', async (req, res, next) => {
    try {
        let results = await projectConnection.fetchIssuesOfProjectId(`"${req.params.project_id}"`);
        logger.info(`Issue fetched of particular id`)
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err)
        next(new Error(`Internal server error, can't get list of issue of this project`))
    }
});

routes.post('/insert', [
    validateEmpty('issue_summary'),
    validateEmpty('issue_description'),
    validateEmpty('issue_status'),
    validateEmpty('identified_by'),
    validateEmpty('assigned_to'),
    validateEmpty('issue_priority'),
    validateEmpty('project_id'),
    validateEmpty('issue_date'),
    validateDate('issue_date')
], async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logger.info(JSON.stringify(errors))
        return res.status(422).json({ errors: errors.array() })
    }


    try {
        await projectConnection.insertIntoIssues(req.body);
        logger.info(`Issues inserted to database`)
        return res.status(200).json({message:`Issues inserted to database`}).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't insert data into issue table`))
    }

})

routes.delete('/delete/:id', async (req, res, next) => {
    try {
        let results = await projectConnection.deleteRowFromIssuesTable(`${req.params.id}`);
        logger.info('Issue Deleted Successfully')
        return res.status(200).json({message:`Issue deleted successfully`}).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't delete data from issue table`))

    }
})

routes.put('/update/:id', async (req, res, next) => {

    try {
        let results = await projectConnection.updateRowFromIssuesTable(`${req.params.id}`, req.body);
        logger.info(`Issue updated successfully`)
        return res.status(200).json({message:`Issue updated successfully`}).end();
    }
    catch (err) {
        logger.error(err)
        next(new Error(`Internal server error, can't update values in issue table`))
    }
    
})

routes.put('/status/:id', [validateEmpty('issue_status')], 
    async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logger.info(JSON.stringify(errors))
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        let results = await projectConnection.updateStatusOfAnIssue(`${req.params.id}`, req.body);
        logger.info('Issue Status succesfully changed')
        return res.status(200).json({message:'Issue status successfully changed'}).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't update status in issue table`))
    }
})

module.exports = routes;