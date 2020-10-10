const { Router } = require('express');

const logger = require('../logger');
const Comment = require('../Modals').Comment;
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const routes = new Router();



routes.get('/', auth, async (req, res, next) => {
    try {
        let results = await Comment.findAll();
        logger.info('All Comment is Fetched')
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err);
        next(new Error(`Internal server error, can't get list of all comments`));
    }
});

routes.get('/:issue_id', auth, async (req, res, next) => {
    try {
        let results = await Comment.findAll({where:{issue_id:req.params.issue_id}});
        logger.info('Comment is fetched of particular issue id');
        return res.status(200).json(results).end();
    }
    catch (err) {
        logger.error(err);
        next(new Error(`Internal server error, can't get list of comments of this issue`));
    }
});

routes.post('/insert', auth, async (req, res, next) => {

    try {
        await Comment.create({comment_id:uuidv4(), ...req.body});
        logger.info('Comment is successfully inserted');
        return res.status(200).json({ message: `Comment is successfully inserted` }).end();
    }
    catch (err) {
        if (err.errors && err.errors[0].type === 'Validation error') {
            res.status(422).json({ msg: `${err.errors[0].path} can't be empty` }).end();
        }

        else {
            logger.error(JSON.stringify(err));
            next(new Error(`Internal server error, can't insert data into comments table`));

        }
    }
})

routes.delete('/delete/:id', auth, async (req, res, next) => {
    try {
        await Comment.destroy({where:{comment_id:req.params.id}});
        logger.info('Comment deleted Successfully');
        return res.status(200).json({ message: `Comment deleted successfully.` }).end();
    }
    catch (err) {
        logger.error(JSON.stringify(err));
        next(new Error(`Internal server error, can't delete data from comments table`));
    }
})

routes.put('/update/:id', auth, async (req, res, next) => {

    try {
        await Comment.update(
            {...req.body},
            {where:{ comment_id:req.params.id}}
        )
        logger.info('Comment updated successfully')
        return res.status(300).json({ message: `Comment updated successfully` }).end();
    }
    catch (err) {
        if (err.errors && err.errors[0].type === 'Validation error') {
            res.status(422).json({ msg: `${err.errors[0].path} can't be empty` }).end();
        }

        else {
            logger.error(JSON.stringify(err));
            next(new Error(`Internal server error, can't update values in comments table`));
        }
    }
})

module.exports = routes;