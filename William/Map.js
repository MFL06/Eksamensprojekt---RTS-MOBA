var tileSize = 40;
var rows = 20;
var cols = 20;
let map = [];

function setup(){
    createCanvas(800,800);
}

// Create map
for (let r = 0; r < rows; r++) {
  map.push(0);

}
/*
  for (let c = 0; c < cols; c++) {
    map[r][c] = 0;
  }
}*/

function draw() {
	background(40,100,20);
     for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            fill("green")
            square(c * tileSize, r * tileSize, tileSize);
    }
  }
}
console.log(map)