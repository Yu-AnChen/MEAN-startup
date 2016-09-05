const Auth = require('express').Router();

Auth.use((req, res, next) => {
    next();
    // req.db.collection('users').find({token: '123456789'}).toArray((err, results)=>{
    //     if (!err) {
    //         if (results[0].name == 'someone') {
    //             req.currentUser = results[0];
    //             next();
    //         } else {
    //             res.sendStatus(404);
    //         }
    //     } else {
    //         res.sendStatus(404);
    //     }
    // })
});

module.exports = Auth;
