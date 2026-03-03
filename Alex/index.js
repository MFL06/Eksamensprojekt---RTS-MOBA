import { tutorial } from './tutorial.js';

/**
* Get canvas context
* @returns {CanvasRenderingContext2D}
*/
function getContext() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

// Size defaults
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

// Text defaults
context.textAlign = 'center';
context.textBaseline = 'middle';

return context;
}
/**
* Main animation loop/frame
*   @param {DOMHighResTimeStamp} time
*/
function animationFrame(time) {
    window.requestAnimationFrame(animationFrame);
    tutorial(context, time);
}
// Set up context and animation loop
const context = getContext();
window.requestAnimationFrame(animationFrame);