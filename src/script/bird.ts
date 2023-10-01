import { CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx } from "<utils>/constants/mainCanvas";
import {BIRD_SPRITE_IMAGES} from "<utils>/constants/sprites";
import {IBird} from "<utils>/types";


export class Bird extends IBird {
  constructor() {
    super();

    this.id = crypto.randomUUID();
    this.width = 130;
    this.height = 73;
    this.x = 0;
    this.y = (CANVAS_HEIGHT - this.width) / 2;
    this.framesCount = BIRD_SPRITE_IMAGES.length;
    this.frame = 0;
    this.birdImages = [];
    this.stagger = 5;
    this.animateCount = 10;
    this.constructBirdImages();
  }

  constructBirdImages() {
    for (let i = 0; i < this.framesCount; i++) {
      const birdImg = new Image();
      birdImg.src = BIRD_SPRITE_IMAGES[i];

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
