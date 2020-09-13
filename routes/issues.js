const {Router} = require('express');
const projectConnection =require('../database/issues');

const routes = new Router();

routes.get('/', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchAllIssues();
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't get list of all Issues`))
    }
});

routes.get('/:project_id', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchIssuesOfProjectId(`"${req.params.project_id}"`);
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't get list of issue of this project`))
    }
});

routes.post('/insert', async (req,res,next) =>{
    try {
        await projectConnection.insertIntoIssues(req.body);
        return res.json(req.body);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't insert data into issue table`))

    }
})

routes.delete('/delete/:id', async (req,res,next) => {
    try {
        let results = await projectConnection.deleteRowFromIssuesTable(`${req.params.id}`);
        return res.json(results.affectedRows);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't delete data from issue table`))

    }
})

routes.put('/update/:id', async (req,res,next) => {    
    console.log('=====================================')
    console.log(req.params)
    try {
        let results = await projectConnection.updateRowFromIssuesTable(`${req.params.id}`,req.body );
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't update values in issue table`))

    }
})

module.exports = routes;