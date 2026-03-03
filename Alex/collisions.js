/*function distance(pointA, pointB){
    const distanceX = pointA.x - pointB.x;
    const distanceY = pointA.y - pointB.y;

    return Math.hypot(distanceX, distanceY);
}*/

import { distance } from './maths.js';

export function circleoverlap(circleA,circleB) {
    const radii = circleA.radius + circleB.radius;

    return distance(circleA, circleB) < radii;
}


/*function circleoverlap(circleA,circleB){
    const radii = circleA.radius + circleB.radius;
    if(distance(circleA, circleB) <= radii){
        return true
    }
    else{
        return false
    }
}*/



/*const circleA = {x : 30, y : 10, radius : 10};
const circleB = {x : 10, y : 30, radius : 10};

const result = circleoverlap (circleA, circleB);
*/

