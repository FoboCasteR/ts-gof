import { CellState } from './cellState';
import { GameBoard } from './gameBoard';

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');

    ctx.scale(2, 2);
    ctx.imageSmoothingEnabled = false;

    this.ctx = ctx;
  }

  render(gameBoard: GameBoard): void {
    const imageData = this.ctx.getImageData(
      0,
      0,
      gameBoard.width,
      gameBoard.height
    );

    for (let y = 0; y < gameBoard.height; y++) {
      for (let x = 0; x < gameBoard.width; x++) {
        let index = (y * gameBoard.width + x) * 4;

        if (gameBoard.getState(x, y) === CellState.Alive) {
          imageData.data[index] = 255;
          imageData.data[++index] = 255;
          imageData.data[++index] = 255;
        } else {
          imageData.data[index] = 0;
          imageData.data[++index] = 0;
          imageData.data[++index] = 0;
        }

        imageData.data[++index] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
    this.ctx.drawImage(this.ctx.canvas, 0, 0);
  }
}
