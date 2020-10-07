const { Router } = require('express');
const routes = new Router();
const logger = require('../logger');
const jwt = require('jsonwebtoken')
const config = require('../config')

const Users = require('../Modals').Users;
const bcrypt = require('bcrypt');

routes.post('/signup', async (req, res, next) => {

    let hash;

    try {
        hash = await bcrypt.hash(req.body.password, 10);
        logger.info('Hash password generated');
    } catch (err) {
        logger.error(JSON.stringify(err));
    }


    try {
        await Users.create({ name: req.body.name, email: req.body.email, password: hash });
        res.status(200).json({ msg: `${req.body.name} is inseted` }).end()
    }
    catch (err) {
        logger.error(err)
        next(new Error(`Internal server error, can't insert user into database`))
    }
});

routes.post('/login', async (req, res, next) => {

    try {
        const user = await Users.findAll({ where: { email: req.body.email } });
        console.log(user, '===============');
        if (user.length === 0) {
            res.status(409).json({ msg: 'user not found' }).end();
        } else {
            const passwordChecker = await bcrypt.compare(req.body.password, user[0].dataValues.password);
            if (!passwordChecker) {
                logger.error('password doesn\'t match');
                res.status(401).json({ msg: 'Password doesn\'t match' }).end();
            }

            const claim = {
                id: req.body.email
            };

            jwt.sign(claim, config.secretToken, (err, token) => {
                if (err) {
                    logger.error('User JWT signing failed');
                    next(err);
                } else {
                    res.status(200).json({ token }).end();
                }
            });
        }

    }
    catch (err) {
        logger.error(JSON.stringify(err));
        throw err;
    }


});

module.exports = routes;