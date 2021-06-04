import { MapLegend } from '../enum/MapLegend';
import { Position } from '../interface/Position';
import { Result } from '../interface/Result';
import { MapValidator } from '../utils/MapValidator';

export class AsciiMap {
  public isSolved = false;
  private _startingPosition: Position;
  private readonly _result: Result;

  public get result(): Result {
    return this._result;
  }

  constructor(private readonly matrix: string[][]) {
    this.isSolved = false;
    this._result = { letters: [], path: [] };
    this._startingPosition = this.initStartingPosition();
  }

  public initStartingPosition(): Position {
    return this.matrix.reduce<Position>(
      (acc, row, rowId) => {
        if (row.includes(MapLegend.StartSymbol)) {
          this._result.path.push(MapLegend.StartSymbol);
          acc = { x: row.indexOf(MapLegend.StartSymbol), y: rowId };
        }
        return acc;
      },
      { x: 0, y: 0 }
    );
  }

  public get startingPosition(): Position {
    return this._startingPosition;
  }

  public get lastPathSymbol() {
    return [...this.result.path].pop();
  }

  public addLetter(letter: string) {
    this._result.letters.push(letter);
  }

  public addPath(symbol: string) {
    this._result.path.push(symbol);
  }

  public charAt(p: Position): string {
    return this.matrix[p.y][p.x];
  }

  public static fromString(asciiMap: string): AsciiMap {
    const matrix: string[][] = asciiMap.split('\n').map((row) => row.replace(/(\r)/gm, '').split(''));
    try {
      MapValidator.validateMap(matrix);
    } catch (error) {
      throw error;
    }

    return new AsciiMap(matrix);
  }
}
