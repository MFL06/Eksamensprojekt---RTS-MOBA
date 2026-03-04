// Tile and grid setup
var tileSize = 80;
var rows = 10;
var cols = 10;
let map = [];

let obj1



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
  obj1 = new Char(map[1][1].x, map[1][1].y)
}


class Vek{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class Char{
    constructor(x, y){
        this.x = x
        this.y = y
        this.r = 30
        this.vek = new Vek(0, 0)
    }

    move(vek){
        this.x += vek.x
        this.y += vek.y
    }

    show(){
        fill('red')
        circle(this.x, this.y, this.r)
    }
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
  obj1.show()
}