const Abstract = require('express').Router();
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

Abstract.get('/:email', (req, res, next)=> {
    const queryData = {
            email: req.params.email
        }
    if (req.query.title) {
        queryData.title = req.query.title;
        // console.log(req.query.title);
    }
    req.db.collection('abstracts')
        .find(queryData)
        .toArray((err, results)=>{
            if (!err) {
                // res.send({abstract: results})
                if (results.length >= 1) {
                    res.json(results);
                    req.db.close();
                } else {
                    res.sendStatus(400);
                    req.db.close();
                }
            } else {
                res.sendStatus(403);
                req.db.close();
            }
        });
});

Abstract.put('/', (req, res)=> {
    if (req.body._id) {
        // update
        const _id = req.body._id;
        delete req.body['_id'];
        
        req.db.collection('abstracts')
            .update({
                _id: ObjectId(_id)
            }, {
                $set: req.body
            }, (err)=> {
                if (!err) {
                    res.sendStatus(200);
                    req.db.close();
                } else {
                    res.sendStatus(403);
                    req.db.close();
                }
            });
    } else {
        // create
        req.db.collection('abstracts')
            .insert((req.body), (err)=> {
                if (!err) {
                    res.sendStatus(200);
                    req.db.close();
                } else {
                    res.sendStatus(403);
                    req.db.close();
                }
            });
    }

});

Abstract.delete('/:id', (req, res) => {
    req.db.collection('abstracts')
    .remove({
        _id: ObjectId(req.params.id)
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

Abstract.post('/', (req, res)=> {
    const data = req.body;
    res.sendStatus(200);
});

module.exports = Abstract;
