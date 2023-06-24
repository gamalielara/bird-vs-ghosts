import { CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx } from "./mainCanvas.js";
import Ghost_0 from "../assets/sprites/ghost/ghost-0.png";
import Ghost_1 from "../assets/sprites/ghost/ghost-1.png";
import Ghost_2 from "../assets/sprites/ghost/ghost-2.png";
import Ghost_3 from "../assets/sprites/ghost/ghost-3.png";
import Ghost_4 from "../assets/sprites/ghost/ghost-4.png";
import Ghost_5 from "../assets/sprites/ghost/ghost-5.png";
import Ghost_6 from "../assets/sprites/ghost/ghost-6.png";
import Ghost_7 from "../assets/sprites/ghost/ghost-7.png";
import Ghost_8 from "../assets/sprites/ghost/ghost-8.png";
import Ghost_9 from "../assets/sprites/ghost/ghost-9.png";
import Ghost_10 from "../assets/sprites/ghost/ghost-10.png";

const spriteImages = [
  Ghost_0,
  Ghost_1,
  Ghost_2,
  Ghost_3,
  Ghost_4,
  Ghost_5,
  Ghost_6,
  Ghost_7,
  Ghost_8,
  Ghost_9,
  Ghost_10,
];

export class Ghost {
  constructor() {
    this.id = crypto.randomUUID();
    this.maginify = Math.random() * 0.6 + 0.4;
    this.width = 99 * this.maginify;
    this.height = 145.5 * this.maginify;
    this.x = CANVAS_WIDTH;
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.dirX = Math.random() * 5 + 1;
    this.dirY = Math.random() * 5 - 2.5;
    this.isLeftTheScreen = false;
    this.framesCount = spriteImages.length;
    this.frame = 0;
    this.count = 0;
    this.staggerAnimation = 5;
    this.ghostImages = [];

    this.constructRavenImages();
  }

  constructRavenImages() {
    for (let i = 0; i < this.framesCount; i++) {
      const ghostImg = new Image();
      ghostImg.src = spriteImages[i];

      this.ghostImages.push(ghostImg);
    }
  }

  animateAndMove() {
    this.x -= this.dirX;

    if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
      this.dirY *= -1;
    }
    this.y += this.dirY;

    // A ghost leaves the screen if its positions is -1 * width
    if (this.x < this.width * -1) {
      this.isLeftTheScreen = true;
    }

    this.frame =
      Math.floor(this.count / this.staggerAnimation) % this.framesCount;

    this.count++;
  }

  draw() {
    // mainCanvasCtx.strokeRect(this.x, this.y, this.width, this.height); // For collision debugging

    mainCanvasCtx.drawImage(
      this.ghostImages[this.frame],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
