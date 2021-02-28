import { CellState } from './cellState';
import { GameBoard } from './gameBoard';
import { GameLoop } from './gameLoop';
import { GameOfLife } from './gameOfLife';
import { Renderer } from './renderer';

function shuffle(board: GameBoard) {
  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      board.setState(
        x,
        y,
        Math.floor(Math.random() * 10) ? CellState.Dead : CellState.Alive
      );
    }
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const WIDTH = 500;
  const HEIGHT = 500;

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.height = HEIGHT;
  canvas.width = WIDTH;

  const renderer = new Renderer(canvas);
  const game = new GameOfLife(250, 250);
  shuffle(game.getBoard());

  const loop = new GameLoop(game, renderer);

  document.getElementById('toggle-button').onclick = function () {
    loop.toggle();
  };

  document.getElementById('step-button').onclick = function () {
    loop.stop();
    loop.tick();
  };

  document.getElementById('restart-button').onclick = function () {
    shuffle(game.getBoard());
  };
});
