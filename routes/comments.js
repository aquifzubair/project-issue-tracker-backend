const {Router} = require('express');
const projectConnection =require('../database/comments');

const routes = new Router();

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

routes.post('/insert', async (req,res,next) =>{
    try {
        await projectConnection.insertIntoComments(req.body);
        return res.json(req.body);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't insert data into comments table`))
    }
})

routes.delete('/delete/:id', async (req,res,next) => {
    try {
        let results = await projectConnection.deleteRowFromCommentsTable(`${req.params.id}`);
        return res.json(results.affectedRows);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't delete data from comments table`))
    }
})

routes.put('/update/:id', async (req,res,next) => {    
    try {
        let results = await projectConnection.updateRowFromCommentsTable(`${req.params.id}`,req.body );
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't update values in comments table`))
    }
})

module.exports = routes;