'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import sync from 'run-sequence';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'graceful-fs';
import yargs from 'yargs';
import lodash from 'lodash';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
    return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
    return path.join(root, 'app/components', glob); // app/components/{glob}
};
let resolveToCommon = (glob = '') => {
    return path.join(root, 'app/modules', glob); // app/components/{glob}
};


// map of all paths
let paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
    styl: resolveToApp('**/*.styl'), // stylesheets
    html: [
        resolveToApp('**/*.html'),
        path.join(root, 'index.html')
    ],
    entry: [
        'babel-polyfill',
        path.join(__dirname, root, 'index.js')
    ],
    output: root,
    blankTemplatesForComponent: path.join(__dirname, 'generator', 'component/**/*.**'),
    blankTemplatesForModule: path.join(__dirname, 'generator', 'module/**/*.**'),
    dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
    const config = require('./webpack.dist.config');
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('webpack', stats.toString({
            progress: true,
            profile: true,
            colors: colorsSupported,
            chunks: false,
            errorDetails: true
        }));
        cb();
    });
});

gulp.task('build', ['webpack', 'copy-assets']);

gulp.task('serve', () => {
    const config = require('./webpack.dev.config');
    config.entry.app = [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?reload=true',
    ].concat(paths.entry);
    var compiler = webpack(config);

    // dashboar alpha
    // const Dashboard = require('webpack-dashboard');
    // const DashboardPlugin = require('webpack-dashboard/plugin');
    // const dashboard = new Dashboard();
    // compiler.apply(new DashboardPlugin(dashboard.setData));

    serve({
        browser: ['google chrome', 'firefox', 'iexplore'],
        port: process.env.PORT || 9001,
        open: false,
        server: {
            baseDir: path.join(__dirname, root)
        },
        middleware: [
            historyApiFallback(),
            webpackDevMiddleware(compiler, {
                stats: {
                    colors: colorsSupported,
                    chunks: false,
                    modules: false
                },
                publicPath: config.output.publicPath,
                quiet: true,
                noInfo: true,
            }),
            webpackHotMiddleware(compiler, {
                log: ()=>{}
            })
        ]
    });
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
    const cap = (val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
    };
    const name = yargs.argv.name;
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToComponents(), parentPath, name);

    return gulp.src(paths.blankTemplatesForComponent)
        .pipe(template({
            name: name,
            upCaseName: cap(name)
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('temp', name);
        }))
        .pipe(gulp.dest(destPath));
});
gulp.task('module', () => {
    const cap = (val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
    };
    const name = yargs.argv.name;
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToCommon(), parentPath, name);

    return gulp.src(paths.blankTemplatesForModule)
        .pipe(template({
            name: name,
            upCaseName: cap(name)
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('temp', name);
        }))
        .pipe(gulp.dest(destPath));
});

// temporary task for vendor js
gulp.task('clean', (cb) => {
    del([paths.dest]).then(function (paths) {
        gutil.log('[clean]', paths);
        cb();
    });
});

gulp.task('copy-assets', () => {
    return gulp.src(path.join(__dirname, root, 'assets/**'))
        .pipe(gulp.dest(path.join(__dirname, 'dist/assets')));
});

gulp.task('default', ['watch']);

gulp.task('start', ()=> {
    nodemon({
        script: 'app.js'
    }).on('start', ['check-routes']);
})
gulp.task('check-routes', () => {
    return gulp.src('app.spec.js', {
        read: false
    }).pipe(mocha());
});
