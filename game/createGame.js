var Board = require('./board');
var randomShipGenerator = require('./shipPlacements.js').randomGrid;

module.exports = function newGame() {
  return new Board(generateShips())
};

function translateCoordinate(coordinate) {
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  return letters[coordinate[0]] + coordinate[1].toString();
}

function generateShips() {
  var destroyers = {
    name: 'Destroyer',
    length: 4,
    quantity: 2
  };
  var battleships = {
    name: 'BattleShip',
    length: 5,
    quantity: 2
  };
  var ships = randomShipGenerator(10, 10, [destroyers, battleships]);
  for (ship of ships){
    ship.coordinates = ship.coordinates.map(translateCoordinate);
  }
  return ships
}
