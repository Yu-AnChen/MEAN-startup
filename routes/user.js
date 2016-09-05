const User = require('express').Router();

User.post('/', (req, res) => {
    req.db.collection('users')
    .insert(req.body, (err, docsInserted) => {
        if (!err) {
            res.json(docsInserted.ops[0]);
            req.db.close();
        } else {
            res.sendStatus(404);
            req.db.close();
        }
    });
});

User.put('/', (req, res) => {
    delete req.body['_id'];
    
    req.db.collection('users')
    .update({
        email: req.body.email
    }, {
        $set: req.body
    }, (err) => {
        res.sendStatus(200);
        req.db.close();
    });
});

User.get('/:email', (req, res) => {
    req.db.collection('users')
    .find({
        email: req.params.email
    }).toArray((err, results) => {
        if (results.length > 0) {
            res.json(results[0]);
            req.db.close();
        } else {
            res.sendStatus(404);
            req.db.close();
        }
    });
});

User.delete('/:email', (req, res) => {
    req.db.collection('users')
    .remove({
        email: req.params.email
    }, (err) => {
        if (!err) {
            res.sendStatus(200);
            req.db.close();
        } else {
            res.sendStatus(404);
            req.db.close();
        }
    });
});

module.exports = User;