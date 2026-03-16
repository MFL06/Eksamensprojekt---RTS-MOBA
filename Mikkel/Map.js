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
const frames = 24


let obj1

let charList = []


function cardcords(){
  for (let crd = 0; crd < cardrows; crd++){
    cards[crd]={
      x: crd * (cardsizew + cardgap) + cardsizew / 2, // center X - spread horizontally with gap
      y: 975, // fixed Y position at bottom
      color: "#d2aa77",
      width: cardsizew,
      height: cardsizeh,
      type: "shit",
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

//Checker om mus kolliderer emd kort
function withinCard(x, y){
  for(let i = 0; i < cardrows; i ++){
    if(x >= cards[i].x + 70 - cardsizew / 2 && x <= cards[i].x + cards[i].width && y <= 975 + cardsizeh/2 && y >= 975 - cardsizeh / 2){
      return i
    }else{
      continue
    }
  }
}

function setup() {
  createCanvas(800, 1100);
  frameRate(24)
  rectMode(CENTER); // draw from center instead of top-left
  // Create 2D map with center coordinates for each square
  cords()
  cardcords()
}

// Gør så man kan flytte karaktererne ud på banen frit
function dragChar(array){
  const mx = mouseX
  const my = mouseY
  if(charList[charList.length - 1].isDragged && mouseIsPressed && mouseX < width && mouseX > 0 && mouseY < 800 && mouseY > 0){
    let list = [] 
    let diffX
    let diffY
    let cords
    for(let r = 0; r < rows; r ++){
      for(let c = 0; c < cols; c ++){
        if(array[r][c].walkable == true){
          diffX = array[r][c].x - mx
          diffY = array[r][c].y - my
          list.push(Math.hypot(diffX, diffY))
          if(list.length > 1 && list[list.length - 1] < 140 && list[list.length - 1] < Math.hypot(cords.x - mx, cords.y - my)){
            cords = {x: array[r][c].x, y: array[r][c].y}
          }else if(list.length == 1){
            cords = {x: array[r][c].x, y: array[r][c].y}
          }
          charList[charList.length - 1].x = cords.x
          charList[charList.length - 1].y = cords.y
        }
        
        
      }
    }
  }else if(charList[charList.length - 1].isDragged && mouseIsPressed){
    cords = {x: mx, y: my}
    charList[charList.length - 1].x = cords.x
    charList[charList.length - 1].y = cords.y
  }

}



// Tjekker for om musen bliver trykket. Efter bruger den dragChar() for at flytte karaktererne
function mousePressed(){
  const mx = mouseX
  const my = mouseY
  console.log(typeof withinCard(mx, my))
  if(typeof withinCard(mx, my) == "number"){
    cardNum = withinCard(mx, my)
    charList.push(new Char(mx, my))
    dragChar(map, charList[charList.length-1])
  }
}

// Gør så man ikke længere kan flytte karakterer, når de er sat ned
function mouseClicked(){
  if(charList.length > 0){
    charList[charList.length - 1].isDragged = false
  }
}

// Karakter class og Vektor class
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
        this.mana = 0
        this.c = "red"
        this.vek = new Vek(0, 0)
        this.isDragged = true
    }

    move(vek){
        this.x += vek.x
        this.y += vek.y
    }

    show(){
        fill(this.c)
        circle(this.x, this.y, this.r)
    }
}

function showAll(list){
  for(let i = 0; i < list.length; i ++){
    list[i].show()
  }
}

class Knight extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 5
  }
}

class Frog extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 2
  }
}

class Tortoise extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 8
  }
}

class Archers extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 4
  }
}

class Bunny extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 3
  }
}


function draw() {
  background(40, 100, 20);

  // Draw the grid squares
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = map[r][c];
      fill(map[r][c].color);
      stroke(0); // optional: add grid lines
      square(tile.x, tile.y, tileSize);
    }
  }

  


  if(charList.length > 0){
    dragChar(map)
  }

  drawcards()
  showAll(charList)
  //dragChar(map)
}


