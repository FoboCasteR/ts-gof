import { CellState } from './cellState';
import { GameBoard } from './gameBoard';

export class GameOfLife {
  private primaryBoard: GameBoard;
  private secondaryBoard: GameBoard;

  constructor(width: number, height: number) {
    this.primaryBoard = new GameBoard(width, height);
    this.secondaryBoard = new GameBoard(width, height);
  }

  update(): this {
    const { primaryBoard: board, secondaryBoard: nextBoard } = this;

    for (let x = 0; x < board.width; x++) {
      for (let y = 0; y < board.height; y++) {
        const neighbours = board.countNeighbours(x, y);

        if (neighbours === 2) {
          nextBoard.setState(x, y, board.getState(x, y));
        } else if (neighbours === 3) {
          nextBoard.setState(x, y, CellState.Alive);
        } else {
          nextBoard.setState(x, y, CellState.Dead);
        }
      }
    }

    this.primaryBoard = nextBoard;
    this.secondaryBoard = board;

    return this;
  }

  getBoard(): GameBoard {
    return this.primaryBoard;
  }
}
