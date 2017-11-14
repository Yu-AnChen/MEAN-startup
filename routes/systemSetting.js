const SystemSetting = require('express').Router();
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Auth = require('./auth');
// those passed will carry req.currentUser

const collectionName = 'systemSetting';

SystemSetting.use((req, res, next) => {
    console.log('SystemSetting middleware');
    next();
});

SystemSetting.get('/', (req, res) => {
    req.db.collection(collectionName)
        .aggregate([
            {
                $lookup: {
                    from: 'admin',
                    localField: 'currentAdminSettingDocId',
                    foreignField: '_id',
                    as: 'currentAdminSettings'
                }
            },
            { $unwind : '$currentAdminSettings' }
        ])
        .toArray()
        .then(results => {
            results.length
            ? res.json(results[0])
            : res.sendStatus(404);
            req.db.close();
        })
        .catch(err => {
            res.sendStatus(500);
            req.db.close();
        });

    // let adminEmail = req.currentUser.email;
    // console.log(adminEmail);
    // // let adminEmail = eventAdminEmail;
    // req.db.collection(collectionName)
    //     .find({ emailsOfAdmins: adminEmail })
    //     .toArray()
    //     .then(results => {
            // results.length
            // ? res.json(results[0])
            // : res.sendStatus(404);
            // req.db.close();
    //     })
        // .catch(err => {
        //     res.sendStatus(500);
        //     req.db.close();
        // });
});

// Admin.put('/', Auth, (req, res) => {
//     let data = Object.keys(adminDataStructure)
//                      .reduce((prev, curr) => {
//                          prev[curr] = req.body[curr];
//                          return prev;
//                      }, {});
//     const lastUpdate = {
//         updatedAt: new Date(),
//         // updatedBy: eventAdminEmail
//         updatedBy: req.currentUser.email
//     };
    
//     req.db.collection(collectionName)
//         .update({
//             _id: ObjectId(req.body._id)
//         }, {
//             $set: data,
//             $addToSet: { _updatedTraces: lastUpdate }
//         }, (err, writeResult) => {
//             err 
//             ? res.sendStatus(500)
//             : !writeResult.result.n
//             ? res.sendStatus(404)
//             : res.sendStatus(200);
//         });
// });

// Admin.delete('/', (req, res) => {});

module.exports = SystemSetting;