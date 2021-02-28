import { CellState } from './cellState';

export class GameBoard {
  private data: CellState[][];

  constructor(readonly width: number, readonly height: number) {
    this.data = new Array(height);
    for (let y = 0; y < height; y++) {
      this.data[y] = new Array(width).fill(CellState.Dead);
    }
  }

  countNeighbours(x: number, y: number): number {
    const { data, height, width } = this;
    const checkTop = y !== 0;
    const checkBottom = y < height - 1;
    const checkLeft = x !== 0;
    const checkRight = x < width - 1;

    let counter = 0;

    if (checkTop) {
      const row = data[y - 1];
      counter += row[x];
      if (checkLeft) counter += row[x - 1];
      if (checkRight) counter += row[x + 1];
    }
    if (checkBottom) {
      const row = data[y + 1];
      counter += row[x];
      if (checkLeft) counter += row[x - 1];
      if (checkRight) counter += row[x + 1];
    }
    if (checkLeft) counter += data[y][x - 1];
    if (checkRight) counter += data[y][x + 1];

    return counter;
  }

  getState(x: number, y: number): CellState {
    return this.data[y][x];
  }

  setState(x: number, y: number, state: CellState): void {
    this.data[y][x] = state;
  }
}
