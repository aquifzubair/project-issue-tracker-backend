const {Router} = require('express');
const projectConnection =require('../database/users');

const routes = new Router();

routes.get('/', async (req,res,next) => {
    try {
        let results = await projectConnection.fetchAllUsers();
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't get list of all users`))
    }
});

routes.post('/insert', async (req,res,next) =>{
    try {
        await projectConnection.insertIntoUsers(req.body);
        return res.json(req.body);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't insert data into user table`))

    }
})

routes.delete('/delete/:id', async (req,res,next) => {
    console.log(req)
    try {
        let results = await projectConnection.deleteRowFromUsersTable(`${req.params.id}`);
        return res.json(results.affectedRows);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't delete data from user table`))

    }
})

routes.put('/update/:id', async (req,res,next) => {    
    console.log('=====================================')
    console.log(req.params)
    try {
        let results = await projectConnection.updateRowFromUsersTable(`${req.params.id}`,req.body );
        console.log(results,"results")
        return res.json(results);
    }
    catch(err) {
        console.error(err)
        next(new Error(`Internal server error, can't update values in user table`))

    }
})

module.exports = routes;