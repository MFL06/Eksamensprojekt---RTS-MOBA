
    class Circle {
    constructor(x, y, r, mass) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-3, 3), random(-3, 3));
        this.r = r;
        this.mass = mass;
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.x - this.r < 0 || this.pos.x + this.r > width)  this.vel.x *= -1;
        if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) this.vel.y *= -1;
    }

    draw() {
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}

function isColliding(a, b) {
    let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
    return d < a.r + b.r;
}

function noOverlap(a, b) {
    let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
    let overlap = (a.r + b.r) - d;
    let normal = p5.Vector.sub(b.pos, a.pos).normalize();
    a.pos.sub(p5.Vector.mult(normal, overlap / 2));
    b.pos.add(p5.Vector.mult(normal, overlap / 2));
}

function calcCollision(a, b) {
    let normal = p5.Vector.sub(b.pos, a.pos).normalize();
    let relVel = p5.Vector.sub(a.vel, b.vel);
    let speed = relVel.dot(normal);

    if (speed > 0) return;

    let impulse = (2 * speed) / (a.mass + b.mass);
    a.vel.sub(p5.Vector.mult(normal, impulse * b.mass));
    b.vel.add(p5.Vector.mult(normal, impulse * a.mass));
}

class World {
    constructor() {
        this.circles = [];
    }

    add(c) {
        this.circles.push(c);
    }

    update() {
        for (let c of this.circles) c.update();

        for (let i = 0; i < this.circles.length; i++) {
            for (let j = i + 1; j < this.circles.length; j++) {
                let a = this.circles[i];
                let b = this.circles[j];
                if (isColliding(a, b)) {
                    noOverlap(a, b);
                    calcCollision(a, b);
                }
            }
        }
    }

    draw() {
        for (let c of this.circles) c.draw();
    }
}

let world;

function setup() {
    createCanvas(600, 600);
    world = new World();

    for (let i = 0; i < 2; i++) {
        let r = random(15, 35);
        world.add(new Circle(random(r, width - r), random(r, height - r), r, r));
    }
}

function draw() {
    background(30);
    world.update();
    world.draw();
}