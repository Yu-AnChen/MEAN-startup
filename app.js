// Modules
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongodb = require('mongodb');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const flash = require('express-flash');
const path = require('path');
const multer = require('multer');

const insertAdminSettingsInit = require('./init/adminSetting');
const initSystemSettings = require('./init/systemSetting');

if (
    process.env.NODE_ENV == 'development' ||
    process.env.NODE_ENV.indexOf('development') > -1
) {
    const dotenv = require('dotenv');
    dotenv.load({
        path: '.env.file'
    });
}

// Setup Express Server
const port = process.env.PORT || 3000;
const app = express();
app.set('port', port);
app.use(compression());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());

const dbClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const dbUrl = process.env.MONGODB_URI || process.env.MONGOLAB_URI;
console.log(dbUrl);
app.use((req, res, next) => {
    dbClient.connect(dbUrl, (err, db) => {
        // app.set('db', db);  => req.app.get('db')
        req.db = db;
        return err ? next(err) : next();
    });
});
let DB;
dbClient.connect(dbUrl)
    .then(db => DB = db)
    .then(() => insertAdminSettingsInit(DB.collection('admin')))
    // .then(data => console.log(data))
    .then((docInserted) => initSystemSettings(DB.collection('systemSetting'), docInserted))
    .then(() => DB.close())
    .catch(err => console.log(err));

// Frontend development
if (process.env.NODE_ENV == 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.dev.config');
    config.entry.app = [
        'webpack-hot-middleware/client?reload=true',
        'babel-polyfill',
        path.join(__dirname, 'src/index.js'),
    ];
    const compiler = webpack(config);
    const webpackMiddleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: __dirname + '/src',
        quiet: true,
        noInfo: true,
        headers: { 'X-Custom-Header': 'yes' },
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });
    app.use(webpackMiddleware);
    app.use(webpackHotMiddleware(compiler, {
        log: ()=>{}
    }));
} else {
    app.use(express.static(path.join(__dirname, 'dist'), {
        maxAge: 31557600000
    }));
}

// Routes
// const auth = require('./routes/auth');
const abstract = require('./routes/abstract');
const abstracts = require('./routes/abstracts');
const user = require('./routes/user');
const users = require('./routes/users');
const currentUser = require('./routes/currentUser');
const toPdf = require('./routes/toPdf');
const admin = require('./routes/admin');
const systemSetting = require('./routes/systemSetting');
// login, logout, signup
// app.use(auth);
app.use('/currentUser', currentUser);
app.use('/user', user);
app.use('/users', users);
app.use('/abstract', abstract);
app.use('/abstracts', abstracts);
app.use('/toPdf', toPdf);
app.use('/admin', admin);
app.use('/systemSetting', systemSetting);

// Errors
app.use(errorHandler());

// Start Server
app.listen(app.get('port'), () => {
    console.log('Listening on port %d in %s mode', app.get('port'), process.env.NODE_ENV);
});

module.exports = app;
