const {Router} = require('express');
const projectConnection =require('../database/users');

const routes = new Router();

routes.get('/', async (req,res) => {
    try {
        let results = await projectConnection.fetchAllUsers();
        return res.json(results);
    }
    catch(err) {
        console.error(err)
    }
});

routes.post('/insert', async (req,res) =>{
    try {
        await projectConnection.insertIntoUsers(req.body);
        return res.json(req.body);
    }
    catch(err) {
        console.error(err)
    }
})

routes.delete('/delete/:id', async (req,res) => {
    console.log(req)
    try {
        let results = await projectConnection.deleteRowFromUsersTable(`${req.params.id}`);
        return res.json(results.affectedRows);
    }
    catch(err) {
        console.error(err)
    }
})

routes.put('/update/:id', async (req,res) => {    
    console.log('=====================================')
    console.log(req.params)
    try {
        let results = await projectConnection.updateRowFromUsersTable(`${req.params.id}`,req.body );
        console.log(results,"results")
        return res.json(results);
    }
    catch(err) {
        console.error(err)
    }
})

module.exports = routes;