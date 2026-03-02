function setup(){
    createCanvas(800, 800)
}

function draw(){

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