import { Bird } from "./bird.js";
import { Ghost } from "./ghost.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx } from "./mainCanvas.js";

let timeToDrawNextGhost = 0;
let lastTimeElapsed = 0;

// Redraw ghost every 500 ms
const drawNextGhostInterval = 500;

const birdPlayer = new Bird();

let ghosts = [];

/** Timestamp is needed for making sure that the drawing consistently happen every certain interval
 * Timestamp is used to compare how many ms elapsed since last render
 * if certain ms is achieved, only then does the window do the rerender
 * When the animation first run, the `timestamp` is undefined. It is defined once the `requestAnimationFrame` is called
 * */

window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38:
      birdPlayer.moveUp();
      break;
    case 40:
      birdPlayer.moveDown();
      break;
    case 37:
      birdPlayer.moveLeft();
      break;
    case 39:
      birdPlayer.moveRight();
      break;
    default:
      break;
  }
});

(function animate(timestamp) {
  mainCanvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  birdPlayer.animate();
  birdPlayer.draw();

  detectCollision();

  // delta time
  let dT = timestamp - lastTimeElapsed;
  lastTimeElapsed = timestamp;
  timeToDrawNextGhost += dT;

  if (timeToDrawNextGhost > drawNextGhostInterval) {
    ghosts.push(new Ghost());
    timeToDrawNextGhost = 0;
    ghosts.sort((a, b) => a.width - b.width);
  }

  ghosts.forEach((ghost) => {
    ghost.animateAndMove();
    ghost.draw();
  });

  // Delete ghosts that has left the screen
  ghosts = ghosts.filter((ghost) => !ghost.isLeftTheScreen);

  requestAnimationFrame(animate);
})(0);

function detectCollision() {
  ghosts.forEach((ghost, i) => {
    const isCollided =
      birdPlayer.x > ghost.x + ghost.width &&
      birdPlayer.x + birdPlayer.width > ghost.x &&
      birdPlayer.y < ghost.y + ghost.height &&
      birdPlayer.y + birdPlayer.height < ghost.y;

    if (isCollided) {
      console.log("HELLO");
      ghosts.splice(i, 1);
    }
  });
}
