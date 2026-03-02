// Tile and grid setup
var tileSize = 80;
var rows = 10;
var cols = 10;
let map = [];

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER); // draw from center instead of top-left
  // Create 2D map with center coordinates for each square
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
  console.log(map); // check the map structure
}

function draw() {
  background(40, 100, 20);

  // Draw the grid squares
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = map[r][c];
      fill("green");
      stroke(0); // optional: add grid lines
      square(tile.x, tile.y, tileSize);
    }
  }
}