import "./styles/main.css";
import {
    mainCanvasCtx,
} from "<utils>/constants/mainCanvas";

import BgSound from "<assets>/sound/bg.mp3";
import { GameManager } from "<script>/gameManager";

const game = new GameManager(mainCanvasCtx);

( function initGame(timestamp) {
    game.begin(timestamp);

    requestAnimationFrame(initGame)
} )(0);

if ( confirm("Press space to listen to some cool music!!") ) {
    window.addEventListener("keydown", (e) => {
        if ( e.key === " " ) {
            const bgAudio = new Audio();
            bgAudio.src = BgSound;
            bgAudio.loop = true;
            bgAudio.play();
        }
    });
}
