import { circleoverlap} from "./collisions.js";

let mousePressed = false;

const circleA = {x : 600, y : 500, radius : 100};
const circleB = {x : 700, y : 500, radius : 150};

document.addEventListener('mousemove',(event) =>{
    if (!mousePressed) return;

    circleA.x = event.clientX;
    circleA.y = event.clientY;
});

document.addEventListener('mousedown',(event) =>{
    mousePressed = true;

    circleA.x = event.clientX;
    circleA.y = event.clientY;
});

document.addEventListener('mouseup',(event) =>{
    mousePressed = false;
});


function drawCircle(context, circle, color, id){
    const {x, y, radius} = circle;

    context.lineWidth = 0;
    context.fillStyle = color;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();

    context.font = `${radius / 2}px Arial`;
    context.fillstyle = 'white';
    context.textBaseline = 'middle';
    context.fillText(id, x, y);
}

function drawCollisionmessage(context, hasCollided){
    context.font = `2vw Arial`;
    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.fillText(
        `Circles are overlapping: ${hasCollided}`,
         context.canvas.width / 2, 10);
}


export function tutorial(context) {
    const hasCollided = circleoverlap (circleA, circleB);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    const alpha = hasCollided ? 0.4 : 1;
    drawCircle(context, circleA, `rgb(47 66 212 / ${alpha})`,'A')
    drawCircle(context, circleB, `rgb(217 84 54 / ${alpha})`,'B')

    drawCollisionmessage(context, hasCollided);
}