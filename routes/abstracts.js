const Abstracts = require('express').Router();

Abstracts.get('/', (req, res) => {
    req.db.collection('abstracts')
        .find({})
        .toArray((err, results )=> {
            if (!err) {
                if (results.length >= 0) {
                    res.json(results);
                    req.db.close();
                } else {
                    // bad request
                    res.sendStatus(400);
                    req.db.close();
                }
            } else {
                // forbidden
                res.sendStatus(403);
                req.db.close();
            }
        });
});

module.exports = Abstracts;