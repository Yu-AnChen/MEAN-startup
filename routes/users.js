const Users = require('express').Router();
const Auth = require('./auth');

Users.get('/', Auth, (req, res) => {
    req.db.collection('users')
        .find({}).toArray((err, results) => {
            if (!err) {
                if (results.length >= 0) {
                    res.json(results);
                } else {
                    // bad request
                    res.sendStatus(400);
                }
            } else {
                // forbidden
                res.sendStatus(403);
            }
            req.db.close();
        });
});

module.exports = Users;