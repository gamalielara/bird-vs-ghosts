import "./styles/main.css";
import { BackgroundLayer } from "./script/backgroundLayer";
import { Bird } from "./script/bird";
import { Explosion } from "./script/explosion";
import { Ghost } from "./script/ghost";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  mainCanvasCtx,
} from "./script/utils/constants/mainCanvas";

import BgSound from "./assets/sound/bg.mp3";
import {BACKGROUND_IMAGES} from "./script/utils/constants/sprites";
import {IGameManager} from "./script/utils/types";



let timeToDrawNextGhost = 0;
let lastTimeElapsed = 0;

// Redraw ghost every 500 ms
const drawNextGhostInterval = 500;

const birdPlayer = new Bird();

let ghosts = [];
const explosions = [];

class GameManager extends IGameManager{
  constructor(context) {
    super();
    this.context = context;
    this.backgrounds = [];

    this.listenToKeyEvent();
    this.setBackgroundImage();
  }

  setBackgroundImage() {
    const bgImages = [];

    for (let i = 0; i < BACKGROUND_IMAGES.length; i++) {
      const bg = new Image();
      bg.src = BACKGROUND_IMAGES[i];

      bgImages.push(bg);
    }

    this.backgrounds = bgImages.map(
      (bg, i) => new BackgroundLayer(this.context, bg, 1 * (i + 1))
    );
  }

  animateBackgrounds() {
    this.backgrounds.forEach((bg) => bg.animate());
  }

  detectCollision() {
    ghosts.forEach((ghost, i) => {
      const isCollided =
        birdPlayer.x < ghost.x + ghost.width &&
        birdPlayer.x + birdPlayer.width > ghost.x &&
        birdPlayer.y < ghost.y + ghost.height &&
        birdPlayer.y + birdPlayer.height > ghost.y;

      if (isCollided) {
        ghosts.splice(i, 1);
        explosions.push(new Explosion(ghost.x, ghost.y));
      }
    });
  }

  listenToKeyEvent() {
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
  }
}

const game = new GameManager(mainCanvasCtx);

/** Timestamp is needed for making sure that the drawing consistently happen every certain interval
 * Timestamp is used to compare how many ms elapsed since last render
 * if certain ms is achieved, only then does the window do the rerender
 * When the animation first run, the `timestamp` is undefined. It is defined once the `requestAnimationFrame` is called
 * */
(function animate(timestamp) {
  mainCanvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  game.animateBackgrounds();
  game.detectCollision();

  birdPlayer.animate();
  birdPlayer.draw();

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

  // draw explosion
  [...Array(explosions.length).keys()].forEach((i) => {
    if (!explosions[i]) return;

    explosions[i].update();
    explosions[i].draw();

    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  });

  requestAnimationFrame(animate);
})(0);

// window.addEventListener("click", (e) => {
//   const { left, top } = canvasEl.getBoundingClientRect();

//   const xPos = e.x - left;
//   const yPos = e.y - top;

//   explosions.push(new Explosion(xPos, yPos));
// });
if (confirm("Press space to listen to some cool music!!")) {
  window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      const bgAudio = new Audio();
      bgAudio.src = BgSound;
      bgAudio.loop = true;
      bgAudio.play();
    }
  });
}
