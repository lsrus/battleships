var randomGridPlacement = require('../game/shipPlacements').randomGrid;
var assert = require('chai').assert;

describe('randomGrid', function() {
  it('should raise an error with incorrect input', function(){
    assert.throws(()=> randomGridPlacement(1, 1), 'random grid requires an array of ship information objects')

  })
  it('should place one ship randomly', function(){
    var placementInfo = [{ name: 'Destroyer', length: 4, quantity: 1}]
    var ships = randomGridPlacement(10, 10, placementInfo);
    assert.equal(ships.length, 1);
    assert.equal(ships[0].name, 'Destroyer');
    assert.equal(ships[0].coordinates.length, 4)
  })
})
