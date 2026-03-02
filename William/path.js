const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40;
const rows = 10;
const cols = 10;

let map = [];

// Create map
for (let r = 0; r < rows; r++) {
  map[r] = [];
  for (let c = 0; c < cols; c++) {
    map[r][c] = 0;
  }
}

// Draw grid
function drawGrid() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = map[r][c] === 1 ? "green" : "lightgray";
      ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
      ctx.strokeRect(c * tileSize, r * tileSize, tileSize, tileSize);
    }
  }
}

drawGrid();