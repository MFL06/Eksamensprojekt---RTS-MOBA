import { circleoverlap} from "./collisions.js";

const circleA = {x : 600, y : 500, radius : 100};
const circleB = {x : 700, y : 500, radius : 150};

function drawCircle(context, circle, color, id){
    const {x, y, radius} = circle;

    context.lineWidth = 0;
    context.fillStyle = color;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();

    context.font = `${radius / 2}px Arial`;
    context.style = 'white';
    context.textBaseline = 'middle';
    context.fillText(id, x, y);
}

function drawCollisonmessage(context, hasCollided){
    context.font = `2vw Arial`;
    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.fillText(
        `Circles are overlapping: ${hasCollided}`,
         context.canvas.width / 2, 10,);
}


export function tutorial(context) {
    const hasCollided = circleoverlap (circleA, circleB);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    drawCircle(context, circleA, 'rgb(47 66 212)','A')
    drawCircle(context, circleB, 'rgb(217 84 54)','B')

    drawCollisonmessage(context, hasCollided);
}