var assert  = require('chai').assert;
var Board = require('../game/board.js');

describe('Board', function(){
  var ships = [ {name: 'Destroyer',  coordinates: [ 'A1', 'A2'] },
                {name: 'Destroyer',  coordinates: ['C5'] } ];
  var board = new Board(ships);
  var attackInfo;

  it('should recognise a non-sinking hit', function(){
    attackInfo = board.attackAt('A1');
    assert.equal(attackInfo.hit, true);
    assert.equal(attackInfo.sunk, false);
    assert.equal(attackInfo.win, false);
  })

  it('should recognise a miss', function(){
    attackInfo = board.attackAt('D5');
    assert.equal(attackInfo.hit, false);
    assert.equal(attackInfo.sunk, false);
    assert.equal(attackInfo.win, false);
  })

  it('should recognise a non-winning sink', function(){
    attackInfo = board.attackAt('C5');
    assert.equal(attackInfo.hit, true);
    assert.equal(attackInfo.sunk, 'Destroyer');
    assert.equal(attackInfo.win, false);
  })

  it('should recognise a win', function(){
    attackInfo = board.attackAt('A2');
    assert.equal(attackInfo.hit, true);
    assert.equal(attackInfo.sunk, 'Destroyer');
    assert.equal(attackInfo.win, true);
  })
})
  
