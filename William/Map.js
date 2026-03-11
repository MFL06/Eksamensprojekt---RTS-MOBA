// Tile and grid setup
var tileSize = 80;
var rows = 10;
var cols = 10;
let map = [];
var cardrows = 4
var cardsizew = 150
var cardsizeh = 200
var cardgap = 20
let cards = []


//------------------------------------------------------- Map ------------------------------------------------------

// Create 2D map with center coordinates for each square
function cords(){
   for (let r = 0; r < rows; r++) {
    map[r] = [];
    for (let c = 0; c < cols; c++) {
      // Bridge
      if(r == 5 && c == 1 || r == 4 && c == 1 || r == 4 && c == 8 || r == 5 && c == 8) {
        map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "grey",
        walkable: true // optional: useful for pathfinding later
        }
      }
      // water
      else if(r == 4 || r == 5){
         map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "blue",
        walkable: false // optional: useful for pathfinding later
      }
      // Towers
      }else if(r == 8 && c == 1 || r == 8 && c == 8 || r == 1 && c == 1 || r == 1 && c == 8){
        map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "#c0c0c0",
        tower: true,
        walkable: false // optional: useful for pathfinding later
      }
      // King tower
      }else if(r == 9 && c == 4 || r == 9 && c == 5 || r == 0 && c == 4 || r == 0 && c == 5){
        map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "#EFBF04",
        ktower: true,
        walkable: false // optional: useful for pathfinding later
      }
      }
      else{  
        // Grass
        map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "green",
        walkable: true // optional: useful for pathfinding later
        }
      }
    }
  }
}

//------------------------------------------------------- Cards ------------------------------------------------------

function cardcords(){
  for (let crd = 0; crd < cardrows; crd++){
    cards[crd]={
      x: crd * (cardsizew + cardgap) + cardsizew / 2, // center X - spread horizontally with gap
      y: 975, // fixed Y position at bottom
      color: "#d2aa77",
      width: cardsizew,
      height: cardsizeh,
    }
  }
}

function drawcards(){
  for (let crd = 0; crd < cards.length; crd++) {
      let card = cards[crd];
      fill(card.color);
      stroke(0); // optional: add grid lines
      rect(card.x + 70, card.y, card.width, card.height);
  }
}

// ------------------------------------------------------ Andre Ting ------------------------------------------------------

function setup() {
  createCanvas(800, 1100);
  rectMode(CENTER); // draw from center instead of top-left
  cords();
  cardcords();
  console.log(map); // check the map structure
  console.log(cards); // check the cards structure
}

// Draw the grid squares
function grid(){
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = map[r][c];
      fill(map[r][c].color);
      stroke(0); // optional: add grid lines
      square(tile.x, tile.y, tileSize);
    }
  }
}

function draw() {
  background(40, 100, 20);
  grid()
  drawcards()
}