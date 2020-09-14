const {Router} = require('express');
const projectConnection =require('../database/comments');

const { check, validationResult } = require('express-validator');

const routes = new Router();

const validateEmpty = (name) => check(`${name}`).isLength({ min: 1 }).withMessage(`${name} Can't be empty`);


routes.get('/', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchAllComments();
        return res.json(results);
    }
    catch(err) {
        console.error(err);
        next(new Error(`Internal server error, can't get list of all comments`))
    }
});

routes.get('/:issue_id', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchCommentsOfIssueById(`"${req.params.issue_id}"`);
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't get list of comments of this issue`))
    }
});

routes.post('/insert', [
    validateEmpty('comment_message'),
    validateEmpty('comment_by'),
    validateEmpty('issue_id')
],async (req,res,next) =>{

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        await projectConnection.insertIntoComments(req.body);
        return res.json({message:`Comment is successfully inserted`});
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't insert data into comments table`))
    }
})

routes.delete('/delete/:id', async (req,res,next) => {
    try {
        let results = await projectConnection.deleteRowFromCommentsTable(`${req.params.id}`);
        return res.json({message:`Comment deleted successfully.`});
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't delete data from comments table`))
    }
})

routes.put('/update/:id', [
    validateEmpty('comment_message'),
    validateEmpty('comment_by'),
    validateEmpty('issue_id')
],async (req,res,next) => {  
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    try {
        let results = await projectConnection.updateRowFromCommentsTable(`${req.params.id}`,req.body );
        return res.json({message:`Comment updated successfully`});
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't update values in comments table`))
    }
})

module.exports = routes;