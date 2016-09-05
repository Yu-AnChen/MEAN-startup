'use strict';
const chai = require('chai');
const assert = chai.assert;
const request = require('request');
const dotenv = require('dotenv');
const path = require('path');
dotenv.load({
    path: '.env.file'
});
const url = 'http://abstract-submission-yuan12.c9users.io:' + process.env.PORT;
let route = (nameWithSlash) => {
    return url + nameWithSlash;
};
describe('Test on Points Rewards System @ ' + url, () => {
    describe('Root', () => {
        it('GET: /', (done) => {
            request(route('/'), (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
    });

    describe('Abstracts Routes', () => {
            it('GET: /abstracts', (done) => {
            request(route('/abstracts'), (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });

        it('GET: /users', (done) => {
            request(route('/users'), (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
    })

    describe('Abstract CRUD API',  ()=> {
        let abstractId;
        before('PUT: /abstract', (done) =>{
            request({
                method: 'put',
                url: route('/abstract'),
                json: {
                    email: 'testing@test.com',
                    title: 'testingTitle',
                }
            }, (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
        
        before('GET: /abstract/:email?title=testingTitle', (done) => {
            request(route('/abstract/testing@test.com?title=testingTitle'), (err, res, body) => {
                    const results = JSON.parse(res.body)
                    abstractId = results[0]._id;
                    assert.equal(res.statusCode, 200);
                    done();
            });
        })
        it('PUT: /abstract', (done) =>{
            request({
                method: 'put',
                url: route('/abstract'),
                json: {
                    _id: abstractId,
                    email: 'testing@test.com',
                    title: 'newTestingTitle',
                    rand: Math.random()*100
                }
            }, (err, res, body) => {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
        
        it('GET: /abstract/:email?title=', (done) => {
            request(route('/abstract/testing@test.com?title='), (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
        
        
        it('DELETE: /abstract/:id',  (done)=> {
            request({
                method: 'delete',
                url: route('/abstract/'+abstractId),
            }, (err, res, body) => {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
    });    
    describe('User CRUD API',  ()=> {
        it('POST: /user', (done) =>{
            request({
                method: 'post',
                url: route('/user'),
                json: {
                    email: 'newuser@gmail.com',
                    affiliation: 'schoole',
                }
            }, (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
        
        it('PUT: /user', (done) =>{
            request({
                method: 'put',
                url: route('/user'),
                json: {
                    email: 'newuser@gmail.com',
                    affiliation: 'updatedschoole',
                }
            }, (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
        
        it('GET: /user/:email', (done) =>{
            request(route('/user/newuser@gmail.com'), (err, res, body) => {
                    assert.equal(res.statusCode, 200);
                    done();
            });
        });
        
        it('DELETE: /user/:email', (done) =>{
            request({
                method: 'delete',
                url: route('/user/newuser@gmail.com'),
            }, (err, res, body) => {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
    });

});
