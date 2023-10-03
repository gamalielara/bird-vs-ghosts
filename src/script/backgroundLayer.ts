import { IBackgroundLayer } from "<utils>/types";
import { CANVAS_HEIGHT } from "<utils>/constants/mainCanvas";

export class BackgroundLayer extends IBackgroundLayer {
    constructor(context, image, speed) {
        super();
        this.context = context;
        this.image = image;
        this.speed = speed;
        this.bgWidth = 1920;
        this.x = 0;
        this.x2 = 1920; // width of the bg image
    }

    animate() {
        if ( this.x < this.bgWidth * -1 ) {
            this.x = this.bgWidth + this.x2 - this.speed;
        } else {
            this.x -= this.speed;
        }

        if ( this.x2 < this.bgWidth * -1 ) {
            this.x2 = this.bgWidth + this.x - this.speed;
        } else {
            this.x2 -= this.speed;
        }

        this.draw();
    }

    draw() {
        this.context.drawImage(this.image, this.x, 0, this.bgWidth, CANVAS_HEIGHT);
        this.context.drawImage(this.image, this.x2, 0, this.bgWidth, CANVAS_HEIGHT);
    }
}
