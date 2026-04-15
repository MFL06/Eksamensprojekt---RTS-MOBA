// Tile and grid setup
var tileSize = 80;
var rows = 10;
var cols = 10;
let map = [];
var cardrows = 4
var cardsizew = 150
var cardsizeh = 200
var cardgap = 20
var towerMaxHp = 1000
var kingTowerHpMax = 2000
let cards = []
const frames = 24
let cardCycle = getCycle()


let charList = []

function getCycle(){
  let list = ["Knight","Frog","Archers","Tortoise","Bunny"]
  for(let i = list.length - 1; i > 0; i --){
    let j = Math.floor(Math.random() * (i + 1));
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list
}

function cardcords(){
  for (let crd = 0; crd < cardrows; crd++){
    cards[crd]={
      x: crd * (cardsizew + cardgap) + cardsizew / 2,
      y: 975,
      color: "#d2aa77",
      width: cardsizew,
      height: cardsizeh,
      type: "shit",
    }
  }
}

function drawcards(list){
  for (let crd = 0; crd < cards.length; crd++) {
      let card = cards[crd];
      if(card.type == "Knight"){
        card.color = "grey"
      }else if(card.type == "Tortoise"){
        card.color = "yellow"
      }else if(card.type == "Bunny"){
        card.color = "white"
      }else if(card.type == "Archers"){
        card.color = "red"
      }else{
        card.color = "brown"
      }
      
      fill(card.color);
      stroke(0);
      rect(card.x + 70, card.y, card.width, card.height);
      fill("black")
      textAlign(CENTER)
      textSize(25)
      card.type = list[crd]
      text(list[crd], card.x + 70, card.y)
  }
}

function cords(){
   for (let r = 0; r < rows; r++) {
    map[r] = [];
    for (let c = 0; c < cols; c++) {
      // Bridge
      if(r == 5 && c == 1 || r == 4 && c == 1 || r == 4 && c == 8 || r == 5 && c == 8) {
        map[r][c] = {
        x: c * tileSize + tileSize / 2,
        y: r * tileSize + tileSize / 2,
        color: "grey",
        walkable: true
        }
      }
      // water
      else if(r == 4 || r == 5){
         map[r][c] = {
        x: c * tileSize + tileSize / 2,
        y: r * tileSize + tileSize / 2,
        color: "blue",
        walkable: false
      }
      
      /*else if(r == && 1 c == 1|| r == 1 && c == 8){
        map[r][c] = {
        x: c * tileSize + tileSize / 2,
        y: r * tileSize + tileSize / 2,
        color: "#c0c0c0"
        tower: true
        walkable: false
        hp: towerHpMax
        maxHp: towerHpMax
        team: "enemy"
        }
      }*/
      // Towers
      }else if(r == 8 && c == 1 || r == 8 && c == 8 || r == 1 && c == 1 || r == 1 && c == 8){
        map[r][c] = {
        x: c * tileSize + tileSize / 2,
        y: r * tileSize + tileSize / 2,
        color: "#c0c0c0",
        tower: true,
        walkable: false
      }
      // King tower
      }else if(r == 9 && c == 4 || r == 9 && c == 5 || r == 0 && c == 4 || r == 0 && c == 5){
        map[r][c] = {
        x: c * tileSize + tileSize / 2,
        y: r * tileSize + tileSize / 2,
        color: "#EFBF04",
        ktower: true,
        walkable: false
      }
      }
      else{  
        // Grass
        map[r][c] = {
        x: c * tileSize + tileSize / 2,
        y: r * tileSize + tileSize / 2,
        color: "green",
        walkable: true
        }
      }
    }
  }
}

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
  rectMode(CENTER);
  cords()
  cardcords()
}

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

function mousePressed(){
  const mx = mouseX
  const my = mouseY
  if(typeof withinCard(mx, my) == "number"){
    i = withinCard(mx, my)
    if(cards[i].type == "Knight"){
      charList.push(new Knight(mx, my))
    }else if(cards[i].type == "Tortoise"){
      charList.push(new Tortoise(mx, my))
    }else if(cards[i].type == "Bunny"){
      charList.push(new Bunny(mx, my))
    }else if(cards[i].type == "Archers"){
      charList.push(new Archers(mx, my))
    }else{
      charList.push(new Frog(mx, my))
    }
    dragChar(map, charList[charList.length-1])
  }
}

function mouseClicked(){
  if(charList.length > 0){
    charList[charList.length - 1].isDragged = false
  }
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
        this.mana = 0
        this.c = "red"
        this.vek = new Vek(0, 0)
        this.isDragged = true
        this.hp = 100
        this.dmg = 10
        this.speed = 10
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
    this.dmg = 15
    this.hp = 200
    this.c = "grey"
    this.speed = 2
  }
}

class Frog extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 3
    this.c = "brown"
    this.speed = 2
  }
}

class Tortoise extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 8
    this.dmg = 10
    this.hp = 400
    this.speed = 1
    this.c = "Yellow"
  }
}

class Archers extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 4
    this.hp = 75
    this.dmg = 20
    this.speed = 1.5
  }
}

class Bunny extends Char{
  constructor(x, y){
    super(x, y)
    this.mana = 3
    this.hp = 50
    this.dmg = 30
    this.speed = 3.5
    this.c = "white"
  }
}

function draw() {
  background(40, 100, 20);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = map[r][c];
      fill(map[r][c].color);
      stroke(0);
      square(tile.x, tile.y, tileSize);
    }
  }

  if(charList.length > 0){
    dragChar(map)
  }

  // Bevæg alle karakterer mod broen
  for (let i = 0; i < charList.length; i++) {
    moveTowardsBridge(charList[i])
  }

  drawcards(cardCycle)
  showAll(charList)

  
}