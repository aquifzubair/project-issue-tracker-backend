const { Router } = require('express');
const projectConnection = require('../database/comments');

const { check, validationResult } = require('express-validator');
const logger = require('../logger');

const routes = new Router();

const validateEmpty = (name) => check(`${name}`).isLength({ min: 1 }).withMessage(`${name} Can't be empty`);


routes.get('/', async (req, res, next) => {
    try {
        let results = await projectConnection.fetchAllComments();
        logger.info('All Comment is Fetched')
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err);
        next(new Error(`Internal server error, can't get list of all comments`))
    }
});

routes.get('/:issue_id', async (req, res, next) => {
    try {
        let results = await projectConnection.fetchCommentsOfIssueById(`"${req.params.issue_id}"`);
        logger.info('Comment is fetched of particular issue id')
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err)
        next(new Error(`Internal server error, can't get list of comments of this issue`))
    }
});

routes.post('/insert', [
    validateEmpty('comment_message'),
    validateEmpty('comment_by'),
    validateEmpty('issue_id')
], async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logger.info(JSON.stringify(errors))
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        await projectConnection.insertIntoComments(req.body);
        logger.info('Comment is successfully inserted')
        return res.status(200).json({ message: `Comment is successfully inserted` }).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't insert data into comments table`))
    }
})

routes.delete('/delete/:id', async (req, res, next) => {
    try {
        let results = await projectConnection.deleteRowFromCommentsTable(`${req.params.id}`);
        logger.info('Comment deleted Successfully')
        return res.status(200).json({ message: `Comment deleted successfully.` }).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't delete data from comments table`))
    }
})

routes.put('/update/:id', [
    validateEmpty('comment_message'),
    validateEmpty('comment_by'),
    validateEmpty('issue_id')
], async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logger.info(JSON.stringify(errors))
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        let results = await projectConnection.updateRowFromCommentsTable(`${req.params.id}`, req.body);
        logger.info('Comment updated successfully')
        return res.status(300).json({ message: `Comment updated successfully` }).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err))
        next(new Error(`Internal server error, can't update values in comments table`))
    }
})

module.exports = routes;