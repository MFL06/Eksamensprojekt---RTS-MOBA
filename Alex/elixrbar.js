let elixir = 0;
let maxElixir = 10;
let regenRate = 0.1;

function setup() {
  createCanvas(400, 100);
}

function draw() {
  background(30);


  if (elixir < maxElixir) {
    elixir += regenRate;
  }

  drawElixirBar();
}

function drawElixirBar() {
  let barX = 20;
  let barY = 30;
  let barW = 300;
  let barH = 40;

  let fillW = map(elixir, 0, maxElixir, 0, barW);
  fill(160, 40, 220);   
  rect(barX, barY, fillW, barH, 8);

  stroke(20, 0, 40);
  strokeWeight(2);
  for (let i = 1; i < maxElixir; i++) {
    let x = barX + (barW / maxElixir) * i;
    line(x, barY, x, barY + barH);
  }

  noFill();
  stroke(200, 100, 255);
  strokeWeight(2);
  rect(barX, barY, barW, barH, 8);

 
  noStroke();
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(floor(elixir), barX + barW + 10, barY + barH / 2);
}

function mousePressed() {
  if (elixir >= 3) {
    elixir -= 3;
  }
}