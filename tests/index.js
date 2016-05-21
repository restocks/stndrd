var stndrd = require('../dist/stndrd');
var expect = require('chai').expect;

describe('stndrd.countries()', function() {
  it('should return an ISO code', function() {
    expect(stndrd.countries('united states')).to.include('US');
  });
});
