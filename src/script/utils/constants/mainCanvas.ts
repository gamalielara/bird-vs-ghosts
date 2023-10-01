export const canvasEl = document.getElementById("main-canvas") as HTMLCanvasElement;

canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

export const mainCanvasCtx = canvasEl.getContext("2d");
export const CANVAS_WIDTH = canvasEl.width;
export const CANVAS_HEIGHT = canvasEl.height;
