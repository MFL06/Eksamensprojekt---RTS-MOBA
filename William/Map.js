// Tile and grid setup
var tileSize = 80;
var rows = 10;
var cols = 10;
let map = [];

// Create 2D map with center coordinates for each square
function cords(){
  for (let r = 0; r < rows; r++) {
    map[r] = [];
    for (let c = 0; c < cols; c++) {
      map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        walkable: true // optional: useful for pathfinding later
      };
    }
  }
}

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER); // draw from center instead of top-left
  cords()
  console.log(map); // check the map structure
}

// Draw the grid squares
function grid(){
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = map[r][c];
      fill("green");
      stroke(0); // optional: add grid lines
      square(tile.x, tile.y, tileSize);
    }
  }
}

function draw() {
  background(40, 100, 20);
  grid()  
}