export function distance(pointA, pointB){
    const distanceX = pointA.x - pointB.x;
    const distanceY = pointA.y - pointB.y;

    return Math.hypot(distanceX, distanceY);
}