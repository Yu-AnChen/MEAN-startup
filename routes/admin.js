const Admin = require('express').Router();
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Auth = require('./auth');
// those passed will carry req.currentUser

const collectionName = 'admin';
// const eventAdminEmail = 'newevent@event.com';
// const eventName = 'Taiwan-TBA 2017';

// const adminDataStructure = {
//     eventName: eventName,
//     submissionDeadline: new Date(),
//     emailsOfAdmins: [eventAdminEmail],
//     abstractResctricToOnePage: true,

//     eventNameDescription: 'The unique identifier for your event',
//     submissionDeadlineDescription: 'The system will not accept abstracts submitted after the deadline',
//     emailsOfAdminsDescription: 'Users with admin level access, add them using their emails',
//     abstractResctricToOnePageDescription: 'Only accept single page abstract?'
// };

const adminDataStructure = require('../init/dataStructure/adminSetting');

Admin.use((req, res, next) => {
    console.log('admin middleware');
    next();
});

const insertInitData = (req, res, next) => {
    const lastUpdate = {
        updatedAt: new Date(),
        updatedBy: eventAdminEmail
    };
    const data = Object.assign({},
        adminDataStructure, {
            _updatedTraces: [lastUpdate]
        }, {
            _createdAt: new Date
        }
    );
    req.db.collection(collectionName)
        .insert(data, (err, docInserted) => {
            err
                ?
                res.send(500) :
                next();
        });
};

const checkInitData = (req, res, next) => {
    req.db.collection(collectionName)
        .find({
            emailsOfAdmins: eventAdminEmail
        })
        .toArray((err, results) => {
            err
                ?
                res.sendStatus(500) :
                results.length ?
                next() :
                insertInitData(req, res, next);
            // req.db.close();
        });
};

Admin.get('/', (req, res) => {
    // let adminEmail = req.currentUser.email;
    // console.log(adminEmail);
    // let adminEmail = eventAdminEmail;
    req.db.collection(collectionName)
        .find({})
        .toArray()
        .then(results => {
            results.length ?
                res.json(results) :
                res.sendStatus(404);
            req.db.close();
        })
        .catch(err => {
            res.sendStatus(500);
            req.db.close();
        });
});

Admin.put('/', Auth, (req, res) => {
    let data = Object.keys(adminDataStructure)
        .reduce((prev, curr) => {
            prev[curr] = req.body[curr];
            return prev;
        }, {});
    const lastUpdate = {
        updatedAt: new Date(),
        // updatedBy: eventAdminEmail
        updatedBy: req.currentUser.email
    };

    req.db.collection(collectionName)
        .find({
            emailsOfAdmins: req.currentUser.email
        })
        .toArray()
        .then(results => !results.length ? Promise.reject() : Promise.resolve())
        .catch(err => {
            res.sendStatus(401);
            return req.db.close();
        })
        .then(() => req.db.collection(collectionName)
            .update({
                _id: ObjectId(req.body._id)
            }, {
                $set: data,
                $addToSet: {
                    _updatedTraces: lastUpdate
                }
            })
        )
        .then(writeResult => {
            !writeResult.result.n ?
                res.sendStatus(404) :
                res.sendStatus(200);
            return req.db.close();
        })
        .catch(err => {
            res.sendStatus(500);
            return req.db.close();
        });


    // req.db.collection(collectionName)
    //     .update({
    //         _id: ObjectId(req.body._id)
    //     }, {
    //         $set: data,
    //         $addToSet: { _updatedTraces: lastUpdate }
    //     }, (err, writeResult) => {
    //         err 
    //         ? res.sendStatus(500)
    //         : !writeResult.result.n
    //         ? res.sendStatus(404)
    //         : res.sendStatus(200);
    //     });
});

Admin.delete('/', (req, res) => {});

module.exports = Admin;