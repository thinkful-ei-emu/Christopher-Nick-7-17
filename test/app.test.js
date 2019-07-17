const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /frequency', () => {
  it('should return an object', () => {
    return request(app)
      .get('/frequency?s=zzzzbbccdddeeeffff')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.all.keys('unique', 'average', 'highest');
        expect(res.body.unique).to.equal(6);
        expect(res.body.average).to.equal(3);
        expect(res.body.highest).to.equal('f');
      });
  });

  it('should throw an error');
}); 