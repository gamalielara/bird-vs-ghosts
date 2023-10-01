import {IGameManager} from "<utils>/types";
import {BACKGROUND_IMAGES} from "<utils>/constants/sprites";
import {BackgroundLayer} from "<script>/backgroundLayer";
import {Explosion} from "<script>/explosion";
import {CANVAS_HEIGHT, CANVAS_WIDTH, mainCanvasCtx} from "<utils>/constants/mainCanvas";
import {Ghost} from "<script>/ghost";
import {Bird} from "<script>/bird";

export class GameManager extends IGameManager {
    timeToDrawNextGhost = 0;
    lastTimeElapsed = 0;

    // Redraw ghost every 500 ms
    drawNextGhostInterval = 500;

    birdPlayer: Bird

    ghosts = [];
    explosions = [];

    constructor(context) {
        super();
        this.context = context;
        this.backgrounds = [];

        this.listenToKeyEvent();
        this.setBackgroundImage();

        this.birdPlayer = new Bird();
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
        this.ghosts.forEach((ghost, i) => {
            const isCollided =
                this.birdPlayer.x < ghost.x + ghost.width &&
                this.birdPlayer.x + this.birdPlayer.width > ghost.x &&
                this.birdPlayer.y < ghost.y + ghost.height &&
                this.birdPlayer.y + this.birdPlayer.height > ghost.y;

            if (isCollided) {
                this.ghosts.splice(i, 1);
                this.explosions.push(new Explosion(ghost.x, ghost.y));
            }
        });
    }

    listenToKeyEvent() {
        window.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 38:
                    this.birdPlayer.moveUp();
                    break;
                case 40:
                    this.birdPlayer.moveDown();
                    break;
                case 37:
                    this.birdPlayer.moveLeft();
                    break;
                case 39:
                    this.birdPlayer.moveRight();
                    break;
                default:
                    break;
            }
        });
    }

    begin(timestamp: number) {
        /** Timestamp is needed for making sure that the drawing consistently happen every certain interval
         * Timestamp is used to compare how many ms elapsed since last render
         * if certain ms is achieved, only then does the window do the rerender
         * When the animation first run, the `timestamp` is undefined. It is defined once the `requestAnimationFrame` is called
         * */

        mainCanvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.animateBackgrounds();
        this.detectCollision();

        this.birdPlayer.animate();
        this.birdPlayer.draw();

        // delta time
        let dT = timestamp - this.lastTimeElapsed;
        this.lastTimeElapsed = timestamp;
        this.timeToDrawNextGhost += dT;

        if (this.timeToDrawNextGhost > this.drawNextGhostInterval) {
            this.ghosts.push(new Ghost());
            this.timeToDrawNextGhost = 0;
            this.ghosts.sort((a, b) => a.width - b.width);
        }

        this.ghosts.forEach((ghost) => {
            ghost.animateAndMove();
            ghost.draw();
        });

        // Delete ghosts that has left the screen
        this.ghosts = this.ghosts.filter((ghost) => !ghost.isLeftTheScreen);

        // draw explosion
        [...Array(this.explosions.length).keys()].forEach((i) => {
            if (!this.explosions[i]) return;

            this.explosions[i].update();
            this.explosions[i].draw();

            if (this.explosions[i].frame > 5) {
                this.explosions.splice(i, 1);
                i--;
            }
        });
    }
}