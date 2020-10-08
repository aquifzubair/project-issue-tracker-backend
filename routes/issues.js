const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');

const routes = new Router();
const logger = require('../logger');
const Issue = require('../Modals').Issue;

routes.get('/', async (req, res, next) => {
    
    try {
        let results = await Issue.findAll();
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
        let results = await Issue.findAll({
            where:{
                project_id:req.params.project_id
            }
        });
        logger.info(`Issue fetched of particular id`)
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err)
        next(new Error(`Internal server error, can't get list of issue of this project`))
    }
});

routes.post('/insert',  async (req, res, next) => {

    try {
        await Issue.create({issue_id:uuidv4(), ...req.body})
        logger.info(`Issues inserted to database`)
        return res.status(200).json({message:`Issues inserted to database`}).end();
    }
    catch (err) {

        if (err.errors && err.errors[0].type === 'Validation error') {
            res.status(422).json({ msg: `${err.errors[0].path} can't be empty` }).end()
        }

        else {
            logger.error(JSON.stringify(err))
            next(new Error(`Internal server error, can't insert values in issue table`))
        }
    }

})

routes.delete('/delete/:id', async (req, res, next) => {
    try {
        await Issue.destroy({
            where: {
                issue_id: req.params.id
            }
        })
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
        await Issue.update(
            { ...req.body },
            { where: { issue_id: req.params.id } }
        )
        logger.info(`Issue updated successfully`)
        return res.status(200).json({message:`Issue updated successfully`}).end();
    }
    catch (err) {
        if (err.errors && err.errors[0].type === 'Validation error') {
            res.status(422).json({ msg: `${err.errors[0].path} can't be empty` }).end()
        }

        else {
            logger.error(JSON.stringify(err));
            next(new Error(`Internal server error, can't update values in issue table`));
        }
    }
    
})

routes.put('/status/:id',  async (req, res, next) => {

    try {
        await Issue.update(
            {issue_status:req.body.issue_status},
            {where:{issue_id:req.params.id}}
        )
        logger.info('Issue Status successfully changed')
        return res.status(200).json({message:'Issue status successfully changed'}).end();
    }
    catch (err) {
        
        if (err.errors && err.errors[0].type === 'Validation error') {
            res.status(422).json({ msg: `${err.errors[0].path} can't be empty` }).end()
        }

        else {
            logger.error(JSON.stringify(err));
            next(new Error(`Internal server error, can't update status in issue table`));
        }
    }
})

module.exports = routes;