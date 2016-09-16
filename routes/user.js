const User = require('express').Router();
const Auth = require('./auth');

function sessionToken(length) {
    var token = '';
    var possible = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var x = 0; x < length; x++) {
        token += possible.charAt(Math.floor(Math.random() * possible.length) + 1);
    }
    return token;
}

User.post('/signup', (req, res) => {
    // console.log(req.body);
    req.db.collection('users')
      .find({
            email: req.body.email  
        }).toArray((err, results) => {
        
        if (!err && results.length > 0) {
            res.status(403).send('email already exist');
            req.db.close();
            console.log('email already exist');
        }
        else if (!err && results.length === 0) {
            const newToken = sessionToken(50);
            req.body.token = newToken;
            
            req.db.collection('users')
              .insert(req.body, (err, docsInserted) => {
                if (!err) {
                    res.cookie('TTBASymposium', newToken); // req.cookies.TTBASymposium == newToken
                    res.json(docsInserted.ops[0]);
                    req.db.close();
                } else {
                    res.sendStatus(404);
                    req.db.close();
                    console.log('error inserting');
                }
            });
        } 
        else {
            res.sendStatus(404);
            req.db.close();
            console.log('error getting');
        }
    })
});

User.post('/signin', (req, res) => {
    // console.log(req.body);
    req.db.collection('users')
      .find({
            email: req.body.email,
            // favoritePhrase: req.body.favoritePhrase
        }).toArray((err, results) => {
        if (!err && results.length > 0) {
            if (req.body.favoritePhrase === results[0].favoritePhrase) {
                // console.log(results);
            const newToken = sessionToken(50);
                req.db.collection('users')
                 .update({
                     email: req.body.email
                 }, {
                     $set: {
                         token: newToken,
                         signInCount: results[0].signInCount + 1,
                     },
                      $push: { 
                         signInDate: req.body.signInDate 
                     } 
                 }, (err, count)=>{
                     if(!err) {
                        res.cookie('TTBASymposium', newToken); // req.cookies.TTBASymposium == newToken
                        res.json(results[0])
                        req.db.close();
                     } else {
                        res.status(403).send('db.find:v,db.update:x');
                        req.db.close();
                     }
                 });
            } else {
                res.status(404).send('db.find:x-password,db.update:x');
                req.db.close()                
            }         
            
        } else {
            res.status(404).send('db.find:x,db.update:x');
            req.db.close();
        }
    });
});

User.delete('/signout', Auth, (req, res) => {
    // console.log("req.body.email");
    // console.log(req.body);
    // if (req.currentUser.email == req.body.email) {
        
        req.db.collection('users')
          .update({ 
            email: req.currentUser.email
          }, { 
              $set: { 
                  token: "" 
              } 
          }, (err, writeResult) => {
              if(!err) {
                  var nMatched = writeResult.result.n;
                  if ( nMatched > 0 ) {
                      res.clearCookie('TTBASymposium');
                      res.sendStatus(200);
                      req.db.close();
                  } else {
                      // 404 user not found   
                      res.sendStatus(404);
                      req.db.close();
                  }
              } else {
                  res.sendStatus(403);
                  req.db.close();
              }
          });
    // } else {
    //     // 403 forbidden
    //     res.sendStatus(403);
    // }
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