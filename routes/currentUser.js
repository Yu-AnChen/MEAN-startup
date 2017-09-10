const CurrentUser = require('express').Router();

CurrentUser.get('/', (req, res) => {
    // next();
    // res.redirect('/');
    req.db.collection('users')
        .find({
            token: req.cookies.TTBASymposium
        }).toArray((err, results) => {
            if (!err && results.length > 0) {
                res.json(results[0]);
                req.db.close();
                // req.currentUser = results[0];
                // console.log(req.currentUser);
                // login 
                // res.cookie('TTBASymposium', newToken)
                // check
                // token: req.cookies.TTBASymposium
                // logout
                // res.clearCookie('TTBASymposium');
                // next();
            } else {
                // 401 unauthorized
                res.sendStatus(401);
                req.db.close();
            }
        });
    // res.send("hello current user");
});

module.exports = CurrentUser;
