import {BackgroundLayer} from "../backgroundLayer";

export class IBackgroundLayer{
    context: CanvasRenderingContext2D;
    image: HTMLImageElement;
    speed : number;
    bgWidth : number;
    x : number;
    x2 : number;
}

export class IBird {
    id: string;
    width : number
    height : number
    x: number;
    y : number
    framesCount : number;
    frame: number
    birdImages : HTMLImageElement[];
    stagger : number;
    animateCount: number;
    displacementX: number;
    displacementY: number;
}

export class IExplosion {
    spriteWidth : number;
    spriteHeight : number;
    width: number;
    height : number;
    x : number;
    y : number;
    image: HTMLImageElement;
    frame : number;
    context : CanvasRenderingContext2D;
    timer : number;
    sound: HTMLAudioElement;
}

export class IGameManager {
    context: CanvasRenderingContext2D;
    backgrounds : BackgroundLayer[];
}

export class IGhost {
    id: string;
    width: number;
    height: number;
    maginify: number;
    x: number;
    y: number;
    dirX: number;
    dirY: number;
    isLeftTheScreen: boolean;
    framesCount: number;
    frame: number;
    count: number;
    staggerAnimation: number;
    ghostImages: HTMLImageElement[];
};