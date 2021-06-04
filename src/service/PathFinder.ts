import { MapDirection } from '../enum/Direction';
import { MapLegend } from '../enum/MapLegend';
import { Position } from '../interface/Position';
import { Result } from '../interface/Result';
import { AsciiMap } from '../model/AsciiMap';
import { Move as Move } from '../type/Move';
import PathUtils from '../utils/Utils';

export class PathFinder {
  private readonly mapDirections = [MapDirection.West, MapDirection.North, MapDirection.East, MapDirection.South];

  private position: Position;
  private direction: MapDirection;
  private pastPositions: Position[];

  constructor(private readonly map: AsciiMap) {
    this.position = map.startingPosition;
    this.pastPositions = [];
    this.direction = MapDirection.None;
  }

  public solve(): Result {
    while (!this.map.isSolved) {
      this.walk();
    }
    return this.map.result;
  }

  private walk(): void {
    const nextStep = this.findNextStep();

    if (nextStep) {
      [this.position, this.direction] = nextStep;

      let char = this.map.charAt(this.position);

      if (char === MapLegend.EndSymbol.toString()) {
        this.map.isSolved = true;
      }

      this.map.addPath(char);
      if (char.match(/[A-Z]/g) && !this.pastPositions.some((p) => p.x === this.position.x && p.y === this.position.y)) {
        this.map.addLetter(char);
        this.pastPositions.push(this.position);
      }
    }
  }

  private findNextStep(): Move | undefined {
    const possibleMoves = this.getPossibleMoves();

    for (const move of possibleMoves) {
      try {
        const currentChar = this.map.charAt(move[0]);
        const previousChar = this.map.lastPathSymbol;

        if (previousChar === MapLegend.CornerSymbol.toString() && !PathUtils.canTurn(currentChar, move[1])) continue;

        if (currentChar.match(/[A-Z]/g) || Object.values<string>(MapLegend).includes(currentChar)) {
          return move;
        }
      } catch (error) {
        continue;
      }
    }
    return;
  }

  private getPossibleMoves(): Move[] {
    const possibleMoves: Move[] = [];

    const oppositeDirection = PathUtils.getOppositeDirection(this.direction);
    const possibleDirections = this.mapDirections.filter((direction) => direction !== this.direction && direction != oppositeDirection);

    if (this.position && this.direction != MapDirection.None) {
      possibleMoves.push(PathUtils.getMoveFromDirection(this.position, this.direction));
    }

    possibleMoves.push(...possibleDirections.map((d) => PathUtils.getMoveFromDirection(this.position, d)));

    return possibleMoves;
  }
}
