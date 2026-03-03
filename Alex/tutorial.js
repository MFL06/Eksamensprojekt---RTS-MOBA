import { circleoverlap} from "./collisions.js";

const circleA = {x : 20, y : 50, radius : 30};
const circleB = {x : 20, y : 10, radius : 10};

function drawCirlce(context, circle, color, id){
    const {x, y, radius} = circle;

    context.lineWdith = 0;
    context.fillstyle = color;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();

    context.font = `${radius / 2}px Arial`;
    context.style = 'white';
    context.textBaseline = 'middle';
    context.fillText(id, x, y);
}



export function tutorial(context) {
    const result = circleoverlap (circleA, circleB);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    drawCirlce(context, circleA, 'rgb(47 66 212)','A')
    drawCirlce(context, circleB, 'rgb(217 84 54)','B')
}