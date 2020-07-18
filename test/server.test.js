const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { app } = require('../server');

// first testing test
describe('GET /user', function() {
  it('responds with string TEST', function(done) {
    request(app)
    .get('/test')
    .expect('TEST', done)
  });
});

// test with correct object return {error: false}
describe('POST', function() {
  it('post correct object',  (done) => {
    request(app)
    .post("/new")
    .send({dateToSend: {
      firstName: 'TEST',
      lastName: 'TEST',
      email: 'TEST',
      date: 'TEST'
     }})
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).to.be.equal(false);
      return done();
    });
  });
});

// test with incorrect object return {error: true}
describe('POST', function() {
  it('post wrong object 1',  (done) => {
    request(app)
    .post("/new")
    //incorect name dateToSendError instead dateToSend
    .send({dateToSendError: {
      firstName: 'TEST',
      lastName: 'TEST',
      email: 'TEST',
      date: 'TEST'
     }})
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).to.be.equal(true);
      return done();
    });
  });
});

// test with incorrect object return {error: true}
describe('POST', function() {
  it('post wrong object 1',  (done) => {
    request(app)
    .post("/new")
    //incorect name firstNameError instead firstName
    .send({dateToSend: {
      firstNameError: 'TEST',
      lastName: 'TEST',
      email: 'TEST',
      date: 'TEST'
     }})
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).to.be.equal(true);
      return done();
    });
  });
});

// test with incorrect object return {error: true}
describe('POST', function() {
  it('post wrong object 1',  (done) => {
    request(app)
    .post("/new")
    //send empty object
    .send({})
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.error).to.be.equal(true);
      return done();
    });
  });
});