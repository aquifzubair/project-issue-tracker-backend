const {Router} = require('express');
const projectConnection =require('../database/project');

const routes = new Router();

routes.get('/', async (req,res) => {
    try {
        let results = await projectConnection.fetchAllProjects();
        return res.json(results);
    }
    catch(err) {
        console.error(err)
    }
});

routes.post('/insert', async (req,res) =>{
    try {
        await projectConnection.insertIntoProjects(req.body);
        return res.json(req.body);
    }
    catch(err) {
        console.error(err)
    }
})

routes.delete('/delete/:id', async (req,res) => {
    try {
        let results = await projectConnection.deleteRowFromProjectTable(`${req.params.id}`);
        return res.json(results.affectedRows);
    }
    catch(err) {
        console.error(err)
    }
})

// routes.put('/update/:id', async (res,req) => {    
//     console.log(req.params.id)
//     try {
//         let results = await projectConnection.updateRowFromTable(`${req.params.id}`,req.body );
//         return res.json(results);
//     }
//     catch(err) {
//         console.error(err)
//     }
// })

module.exports = routes;