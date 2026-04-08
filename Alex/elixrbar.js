/*let circle1;
let circle2;


function setup(){
    createCanvas(600, 400)
    circle1 = new Circle(100, 150, 6, 1, 1);
    circle2 = new Circle(100, 150, 10, -1, -1);
    print(circle.x, circle.y)
}

function draw(){
    background(0);
    circle1.move();
    circle1.show();
    circle2.move();
    circle2.show();
}

class Circle{
    constructor(x, y, r, vx, vy) {
        this.position = (x,y);
        this.y = y;
        this.r = r;
        this.velocity = vx
        this.velocity = vy
        
    }
      

    move() {
    this.x = this.x + this.vx
    this.y = this.y + this.vy

}

show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2)
}
}
*/


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