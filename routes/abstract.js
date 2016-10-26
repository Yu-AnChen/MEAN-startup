const Abstract = require('express').Router();
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Auth = require('./auth');
// const Auth = require('./auth');

// Abstract.get('/:email', Auth, (req, res, next)=> {
Abstract.get('/:email', (req, res, next)=> {
    // get '/abstract/currentUser'
    if (req.params.email == 'currentUser') {
        // console.log(req.currentUser);
        req.params.email = req.currentUser.email;
    }
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
                // console.log(results);
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

Abstract.put('/', Auth, (req, res)=> {
    if (req.body._id) {
        // update
        const _id = req.body._id;
        const submittedAt = (req.body.submittedAt.length)?req.body.submittedAt[0]:null;
        delete req.body['_id'];
        delete req.body['createdAt'];
        delete req.body['submittedAt'];
        
        req.db.collection('abstracts')
            .update({
                _id: ObjectId(_id)
            }, {
                $set: req.body,
                $addToSet: { submittedAt: submittedAt }
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
        delete req.body['updatedAt'];
        
        req.db.collection('abstracts')
            .insert((req.body), (err, docsInserted)=> {
                if (!err) {
                    // res.sendStatus(200);
                    res.json(docsInserted);
                    // 
                    req.db.close();
                } else {
                    res.sendStatus(403);
                    req.db.close();
                }
            });
    }
});

// Abstract.put('/:absId', Auth, (req, res) => {
Abstract.put('/:absId', (req, res) => {
    // console.log(req.body.selectedForTalk);
    // console.log(req.params.absId);
    
    // const isSelected = req.body.selectedForTalk;
    // console.log(req.body)
    req.db.collection('abstracts')
    .update({
        _id: ObjectId(req.params.absId)
    }, {
        $set: req.body,
    }, (err) => {
        if (!err) {
            res.sendStatus(200);
            req.db.close();
        } else {
            res.sendStatus(403);
            req.db.close();
        }
    })
});
Abstract.delete('/:id', Auth, (req, res) => {
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

Abstract.post('/', Auth, (req, res)=> {
    const data = req.body;
    res.sendStatus(200);
});

module.exports = Abstract;
