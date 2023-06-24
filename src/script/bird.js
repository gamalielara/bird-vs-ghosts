import { CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx } from "./mainCanvas.js";
import Bird_0 from "../assets/sprites/bird/bird-0.png";
import Bird_1 from "../assets/sprites/bird/bird-1.png";
import Bird_2 from "../assets/sprites/bird/bird-2.png";
import Bird_3 from "../assets/sprites/bird/bird-3.png";
import Bird_4 from "../assets/sprites/bird/bird-4.png";
import Bird_5 from "../assets/sprites/bird/bird-5.png";
import Bird_6 from "../assets/sprites/bird/bird-6.png";
import Bird_7 from "../assets/sprites/bird/bird-7.png";
import Bird_8 from "../assets/sprites/bird/bird-8.png";
import Bird_9 from "../assets/sprites/bird/bird-9.png";
import Bird_10 from "../assets/sprites/bird/bird-10.png";

const spriteImages = [
  Bird_0,
  Bird_1,
  Bird_2,
  Bird_3,
  Bird_4,
  Bird_5,
  Bird_6,
  Bird_7,
  Bird_8,
  Bird_9,
  Bird_10,
];

export class Bird {
  constructor() {
    this.id = crypto.randomUUID();
    this.width = 130;
    this.height = 73;
    this.x = 0;
    this.y = (CANVAS_HEIGHT - this.width) / 2;
    this.framesCount = spriteImages.length;
    this.frame = 0;
    this.birdImages = [];
    this.stagger = 5;
    this.animateCount = 10;
    this.constructBirdImages();
  }

  constructBirdImages() {
    for (let i = 0; i < this.framesCount; i++) {
      const birdImg = new Image();
      birdImg.src = spriteImages[i];

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
