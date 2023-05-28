import { CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx } from "./mainCanvas.js";

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
    this.framesCount = 11;
    this.frame = 0;
    this.count = 0;
    this.staggerAnimation = 5;
    this.ghostImages = [];

    this.constructRavenImages();
  }

  constructRavenImages() {
    for (let i = 0; i < this.framesCount; i++) {
      const ghostImg = new Image();
      ghostImg.src = `./sprites/ghost/ghost-${i}.png`;

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
