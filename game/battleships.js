var createGame = require('./createGame');
var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var coordinateRE = new RegExp(/^[A-J][0-9]$/);
var currentGame;

beginGame();

function handleInput(input){
  var lower = input.toLowerCase();
  if (input == 'misses'){
    console.log(currentGame.misses.join(', ') || 'No misses yet');
    readline.question('Attack at: ', handleInput);
  } else if (input == 'strikes'){
    console.log(currentGame.hits.join(', ') || 'No strikes yet');
    readline.question('Next instruction: ', handleInput);
  } else if (input == 'exit'){
    console.log('Goodbye');
    readline.close();
  } else {
    handleCoordinate(input)
  }
}

function handleCoordinate(coord){
  coord = coord.toUpperCase();
  if (!coord.match(coordinateRE)){
    readline.question('Please provide coordinate [A-J][0-9] e.g D7 or type Exit to escape: ', handleInput)
  } else {
    var attack = currentGame.attackAt(coord)
    if (attack.hit) {
      console.log('You hit something at ' + coord);
      if (attack.sunk) {
        console.log('You sank a ' + attack.sunk + '!');
      }
      if (attack.win) {
        readline.question('You win! Play again? (y/ n)', handleWin)
      } else {
        readline.question('Next instruction: ', handleInput)
      }
    } else {
      readline.question('You missed! Next instruction: ', handleInput)
    }
  }
}
function handleWin(answer){
  if (answer.toLowerCase() == 'y'){
    beginGame()
  } else if (answer.toLowerCase() == 'n'){
    readline.close()
  } else {
    readline.question('Please answer y/n: ', handleWin)
  }
}

function beginGame(){
  currentGame = createGame();
  console.log('Enemy ships are hiding nearby.');
  console.log('You may review strikes by entering "strikes"');
  console.log('You may review misses by entering "misses"');
  console.log('You may quit by entering "exit"');
  console.log('Launch a missile by giving a coordinate from A1 to J9')
  readline.question('Next instruction: ', handleInput);
}
