import { CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx } from "./mainCanvas.js";

export class Bird {
  constructor() {
    this.id = crypto.randomUUID();
    this.width = 130;
    this.height = 73;
    this.x = 0;
    this.y = (CANVAS_HEIGHT - this.width) / 2;
    this.framesCount = 11;
    this.frame = 0;
    this.birdImages = [];
    this.stagger = 1;
    this.animateCount = 0;

    this.constructBirdImages();
  }

  constructBirdImages() {
    for (let i = 0; i < this.framesCount; i++) {
      const birdImg = new Image();
      birdImg.src = `./sprites/bird/bird-${i}.png`;

      this.birdImages.push(birdImg);
    }
  }

  animate() {
    this.frame =
      Math.floor(this.animateCount / this.stagger) % this.framesCount;

    this.animateCount++;
  }

  draw() {
    // mainCanvasCtx.strokeRect(this.x, this.y, this.width, this.height); // For collision debugging
    mainCanvasCtx.drawImage(
      this.birdImages[this.frame],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  moveUp() {
    if (this.y > 0) {
      this.y -= 20;
    }
  }

  moveDown() {
    if (this.y < CANVAS_HEIGHT - this.height) {
      this.y += 20;
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 20;
    }
  }

  moveRight() {
    if (this.x < CANVAS_WIDTH - this.width) {
      this.x += 20;
    }
  }
}
