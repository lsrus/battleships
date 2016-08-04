module.exports.randomGrid = randomGrid;

function randomGrid(xLength, yLength, placementInfo) {

  if(! (typeof xLength == 'number' && typeof yLength == 'number')){
    throw 'xLength and yLength require numerical input'
  }
  if (! placementInfo || ! (placementInfo instanceof Array) || ! placementInfo.length){
    throw 'random grid requires an array of ship information objects'
  }
  var ships = [];
  var currentlyTaken = blockOffGridCoordinates(xLength, yLength);
  var coordinates;

  for(shipType of placementInfo){
    for(var i = 0; i < shipType.quantity; i++){
      coordinates = randomlyPlace(shipType.length, xLength, yLength, currentlyTaken);
      ships.push({name: shipType.name, coordinates: coordinates});
      currentlyTaken = currentlyTaken.concat(coordinates)
    }
  }
  return ships;
}

function clashingCoordinates(a, b){
  return (a[0] == b[0] && a[1] == b[1]);
}

function coordinateInArray(coord, array){
  return array.some(function(coord2) { return clashingCoordinates(coord, coord2) })
}

function addCoordinates(coord1, coord2) {
  return [ coord1[0] + coord2[0], coord1[1] + coord2[1]];
}

function blockOffGridCoordinates(xLength, yLength){
  var blocked = [];
  for (var y = 0; y < yLength; y++){
    blocked.push([xLength, y]);
  }
  for (var x = 0; x < xLength; x++){
    blocked.push([x, yLength])
  }
  return blocked;
}

function randomlyPlace(length, xMax, yMax, blocked){
  
  var directions = [[0, 1], [1, 0]]
  var randomN = (n) => Math.floor(Math.random() * n)
  var randomCoords = ()  => [ randomN(xMax), randomN(yMax) ];
  var randomDirection = () => directions[randomN(2)]
  var placed = true;
  var coord;
  var direction;
  var safeCoords;

  do {
    placed = true;
    safeCoords = [];
    coord = randomCoords();
    direction = randomDirection();
    for (var i = 0; i < length; i++) {
      if (coordinateInArray(coord, blocked)) placed = false;
      else safeCoords.push(coord);
      coord = addCoordinates(coord, direction);
    }
  } while (!placed)

  return safeCoords;
}



