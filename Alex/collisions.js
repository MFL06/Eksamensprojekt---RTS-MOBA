import { distance } from './maths.js';

export function circleoverlap(circleA,circleB) {
    const radii = circleA.radius + circleB.radius;

    return distance(circleA, circleB) < radii;
}


    function circleoverlap(circleA,circleB){
    const radii = circleA.radius + circleB.radius;
    if(distance(circleA, circleB) <= radii){
        return true
    }
    else{
        return false
    }
}


