var colliding = false;
var racketGeneralIncrement = 10;
// Ball Variables
var xBallPosition = 300;
var yBallPosition = 200;
var ballDiameter = 40;
var ballIncrement = 10;
var xBallIncrement = ballIncrement;
var yBallIncrement = ballIncrement;
let marginOfError = ballDiameter / 2;

// Racket one variables
var yRacketOneIncrement = racketGeneralIncrement;
var xRacketOnePosition = 20;
var yRacketOnePosition = 400;
var racketOneWidth = 20;
var racketOneHeight = 150;

// Racket two variables
var yRacketTwoIncrement;
var xRacketTwoPosition = 900;
var yRacketTwoPosition = 400;
var racketTwoWidth = 20;
var racketTwoHeight = 150;

// Game Scoreboard
var myPoints = 0;
var opponentPoints = 0;

// Sounds
var soundtrack;
var bonk;
var wallSound;

function preload() {
  soundtrack = loadSound("trilha.mp3");
  bonk = loadSound("raquetada.mp3");
  wallSound = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(940, 800);
  soundtrack.loop();
}

function draw() {
  background("black");
  //Ball
  showBall();
  incrementPosition();
  collisionBorder();

  //Rackets
  //Racket one
  showRacket(xRacketOnePosition, yRacketOnePosition);
  movementRacketOne();
  ballCollisionRacketOne();

  //Racket two
  showRacket(xRacketTwoPosition, yRacketTwoPosition);
  moveRacketTwo();
  ballCollisionRacketTwo();

  // Scoreboard
  includeScoreboard(myPoints, 100, 100);
  includeScoreboard(opponentPoints, 780, 100);
  makePoints();
}

//RACKET FUNCTIONS

function showRacket(x, y) {
  rect(x, y, racketOneWidth, racketOneHeight);
}

function movementRacketOne() {
  if (keyIsDown(87)) {
    yRacketOnePosition -= yRacketOneIncrement;
  }
  if (keyIsDown(83)) {
    yRacketOnePosition += yRacketOneIncrement;
  }
}

// BALL FUNCTIONS
function showBall() {
  circle(xBallPosition, yBallPosition, ballDiameter);
}

function incrementPosition() {
  xBallPosition += xBallIncrement;
  yBallPosition -= yBallIncrement;
}

function collisionBorder() {
  if (
    yBallPosition - marginOfError <= 0 ||
    yBallPosition + marginOfError >= height
  ) {
    yBallIncrement *= -1;
  }
  if (
    xBallPosition - marginOfError <= 0 ||
    xBallPosition + marginOfError >= width
  ) {
    xBallIncrement *= -1;
  }
}

function ballCollisionRacketOne() {
  colliding = collideRectCircle(
    xRacketOnePosition,
    yRacketOnePosition,
    racketOneWidth,
    racketOneHeight,
    xBallPosition,
    yBallPosition,
    marginOfError
  );
  if (colliding) {
    xBallIncrement *= -1;
    bonk.play();
  }
}

function ballCollisionRacketTwo() {
  colliding = collideRectCircle(
    xRacketTwoPosition,
    yRacketTwoPosition,
    racketTwoWidth,
    racketTwoHeight,
    xBallPosition,
    yBallPosition,
    marginOfError
  );
  if (colliding) {
    xBallIncrement *= -1;
    bonk.play();
  }
}

function moveRacketTwo() {
  yRacketTwoIncrement =
    yBallPosition - yRacketTwoPosition - racketTwoHeight / 2 + 30;
  yRacketTwoPosition += yRacketTwoIncrement;
}

// Scoreboard
function includeScoreboard(sidePoints, x, y) {
  fill("yellow");
  textAlign(CENTER);
  textSize(100);
  textFont("Consolas");
  text(sidePoints, x, y);
  fill("white");
}

function makePoints() {
  if (xBallPosition < 30) {
    opponentPoints++;
    wallSound.play();
  } else if (xBallPosition > 910) {
    myPoints++;
    wallSound.play();
  }
}
