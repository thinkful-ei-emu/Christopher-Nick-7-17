const expect = require('chai').expect;
const request = require('supertest');
const server = require('../index');

describe('GET /apps', () => {
  it('should return an array of app objects with specific keys', () => {
    return request(server)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.include.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size',
          'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver');
      });
  });

  it('should sort apps by rating or title', () => {
    const sortVals = ['Rating', 'App'];
    sortVals.forEach(sort => {
      it(`should return 200 with ${sort} sorted list`, () => {
        return request(server)
          .get('/apps')
          .query({ sort })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            let i = 1; 
            let correctOrder = true; 
            while ( correctOrder && i < res.body.length) { 
              if (res.body[i - 1][sort] > res.body[i][sort]) {
                correctOrder = false; } 
              i++; } 
            expect(correctOrder).to.be.true;       
          });
      });
    });
  });


  it('should be filterable by genre', () => {
    let genreVals = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
    genreVals.forEach(genres => {
      it(`should be filtered by ${genres}`, () => {
        return request(server)
          .get('/apps')
          .query({ genres })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
          });
      });
    });
  });

  it('should throw error for invalid sort query', () => {
    return request(server)
      .get('/apps')
      .query({ sort: 'cheese' })
      .expect(400, {error: 'Sort must be \'rating\' or \'app\''});
  });

  it('should throw error for invalid genre query', () => {
    return request(server)
      .get('/apps')
      .query({ genres: 'cheese' })
      .expect(400, {error: 'Please enter valid genres, ex: action'});
  });
});