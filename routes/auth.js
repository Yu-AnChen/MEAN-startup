const Auth = require('express').Router();

Auth.use((req, res, next) => {
    // next();
    // res.redirect('/');
    req.db.collection('users')
        .find({
            token: req.cookies.TTBASymposium
        }).toArray((err, results)=>{
            if (!err && results.length >0) {
                req.currentUser = results[0];
                console.log(req.currentUser);
                // login 
                // res.cookie('TTBASymposium', newToken)
                // check
                // token: req.cookies.TTBASymposium
                // logout
                // res.clearCookie('TTBASymposium');
                next();
            } else {
                // 401 unauthorized
                res.sendStatus(401);
            } 
        })
});

module.exports = Auth;
