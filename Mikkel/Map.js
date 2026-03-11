// Tile and grid setup
var tileSize = 80;
var rows = 10;
var cols = 10;
let map = [];

let obj1

let charList = []


function setup() {
  createCanvas(800, 900);
  rectMode(CENTER); // draw from center instead of top-left
  // Create 2D map with center coordinates for each square
  for (let r = 0; r < rows; r++) {
    map[r] = [];
    for (let c = 0; c < cols; c++) {
      if(r == 1 && c == 1) {
        map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "green",
        walkable: true // optional: useful for pathfinding later
        }
      }else{
        map[r][c] = {
        x: c * tileSize + tileSize / 2, // center X
        y: r * tileSize + tileSize / 2, // center Y
        color: "green",
        walkable: true // optional: useful for pathfinding later
        }
      }
      
    }
  }
  console.log(map); // check the map structure
  //obj1 = new Char(map[2][2].x, map[2][2].y)
  //charList.push(obj1)
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
        diffX = array[r][c].x - mx
        diffY = array[r][c].y - my + 40
        list.push(Math.hypot(diffX, diffY))
        if(list.length > 1 && list[list.length - 1] < 80 && list[list.length - 1] < list[list.length - 2]){
          cords = {x: array[r][c].x, y: array[r][c].y}
        }else if(list.length == 1){
          cords = {x: array[r][c].x, y: array[r][c].y}
        }
      }
    }
    charList[charList.length - 1].x = cords.x
    charList[charList.length - 1].y = cords.y
  }else if(charList[charList.length - 1].isDragged && mouseIsPressed){
    cords = {x: mx, y: my}
    charList[charList.length - 1].x = cords.x
    charList[charList.length - 1].y = cords.y
  }

}
/*
function findSquare(array){
  const mx = mouseX
  const my = mouseY
  if(mx < width && mx > 0 && my < 800 && my > 0){
    let list = [] 
    let diffX
    let diffY
    let cords
    for(let r = 0; r < rows; r ++){
      for(let c = 0; c < cols; c ++){
        diffX = array[r][c].x - mx
        diffY = array[r][c].y - my + 40
        list.push(Math.hypot(diffX, diffY))
        if(list.length > 1 && list[list.length - 1] < 80 && list[list.length - 1] < list[list.length - 2]){
          cords = {x: array[r][c].x, y: array[r][c].y}
        }else if(list.length == 1){
          cords = {x: array[r][c].x, y: array[r][c].y}
        }
      }
    }
    return cords
  }
  else{
    cords = {x: mx, y: my}
    return cords
  } 
}
*/
function mousePressed(){
  const mx = mouseX
  const my = mouseY

  if(Math.hypot(200 - mx, 840 - my) <= 25){
    charList.push(new Char(mx, my))
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

  circle(200, 840, 50)
  circle(280, 840, 50)
  circle(360, 840, 50)
  if(charList.length > 0){
    dragChar(map)
  }
  
  showAll(charList)
  //dragChar(map)
}


