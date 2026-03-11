function setup(){
    createCanvas(800, 800)
}

function draw(){
	background(220);
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
}