module.exports = Board;

function removeElement(array, element){
  var length = array.length;
  for (var i = 0; i < length; i++){
    if (array[i] === element) {
      array.splice(i, 1);
      break;
    }
  }
}

function Board(ships){
  this.ships = ships;
  this.hits = [];
  this.misses = [];
}

Board.prototype.attackAt = function(position){
  var attackInfo = {
    hit: false,
    sunk: false,
    win: false
  }
  for (ship of this.ships) {
    if (ship.coordinates.indexOf(position) >= 0) {
      this.hits.push(position);
      attackInfo.hit = true;
      removeElement(ship.coordinates, position);
      if (ship.coordinates.length == 0) {
        attackInfo.sunk = ship.name;
        removeElement(this.ships, ship);
        if (this.ships.length == 0) {
          attackInfo.win = true
        }
      }
    }
  }
  if (! attackInfo.hit) {
    this.misses.push(position)
  }
  return attackInfo;
}
