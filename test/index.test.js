const expect = require('chai').expect;
const request = require('supertest');
const sort = require('../index');

describe('sort', () => {
  it('should return an array of numbers', () => {
    expect(sort([1,2,3,4])).to.deep.equal([1,2,3,4]);
  });

  it('should list array in ascending order', () => {
    expect(sort([4,2,3,1])).to.deep.equal([1,2,3,4]);
  });

  it('should return an empty array if given an empty array', () => {
    expect(sort([])).to.deep.equal([]);
  });
  

  it('should replace current index with 0 if datatype is not number', () => {
    expect(sort(['h', true])).to.deep.equal([0,0]);
  });


});