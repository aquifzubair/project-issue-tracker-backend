const {Router} = require('express');
const projectConnection =require('../database/project');

const routes = new Router();

routes.get('/', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchAllProjects();
        return res.send(results);
    }
    catch(err) {
        console.error(err);
        next(new Error(`Internal server error, can't get list of all projects`))
    }
});

routes.post('/insert', async (req,res,next) =>{
    try {
        await projectConnection.insertIntoProjects(req.body);
        return res.json(req.body);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't insert data into project table`))
    }
})

routes.delete('/delete/:id', async (req,res,next) => {
    try {
        let results = await projectConnection.deleteRowFromProjectTable(`${req.params.id}`);
        return res.json(results.affectedRows);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't delete data from project table`))
    }
})

routes.put('/update/:id', async (req,res,next) => {    
    try {
        let results = await projectConnection.updateRowFromTable(`${req.params.id}`,req.body );
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't update values in project table`))
    }
})

module.exports = routes;