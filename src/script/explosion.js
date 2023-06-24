import { mainCanvasCtx } from "./mainCanvas.js";
import ExplosionSound from "../assets/sound/explosion.wav";
import ExplosionSprites from "../assets/sprites/explosion.png";

export class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src = ExplosionSprites;
    this.frame = 0;
    this.context = mainCanvasCtx;
    this.timer = 0;
    this.sound = new Audio();
    this.sound.src = ExplosionSound;
  }

  update() {
    if (this.timer === 0) {
      this.sound.play();
    }

    this.timer++;

    if (this.timer % 5 === 0) {
      this.frame++;
    }
  }

  draw() {
    // sw = source width --> which area you want to start cropping the spritesheet
    // sh = source height
    // dx = destination x --> which area you want to end (destination) cropping the spritesheet
    // dy = destination y
    // this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

    // current horizontal pos
    const sx = this.spriteWidth * this.frame;
    const sy = 0; // The sprite sheet only has one row
    const sw = this.spriteWidth;
    const sh = this.spriteHeight;

    //destination
    const dx = this.x;
    const dy = this.y;
    const dw = this.width;
    const dh = this.height;

    this.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}
