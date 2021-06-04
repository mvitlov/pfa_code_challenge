import { MapDirection } from '../enum/Direction';
import { MapLegend } from '../enum/MapLegend';
import { Position } from '../interface/Position';
import { Move } from '../type/Move';

export default class PathUtils {
  public static getOppositeDirection(direction: MapDirection): MapDirection {
    switch (direction) {
      case MapDirection.West:
        return MapDirection.East;
      case MapDirection.North:
        return MapDirection.South;
      case MapDirection.East:
        return MapDirection.West;
      case MapDirection.South:
        return MapDirection.North;
      default:
        return MapDirection.None;
    }
  }

  public static getMoveFromDirection(position: Position, direction: MapDirection): Move {
    switch (direction) {
      case MapDirection.West:
        return [{ x: position.x - 1, y: position.y }, direction];
      case MapDirection.North:
        return [{ x: position.x, y: position.y - 1 }, direction];
      case MapDirection.East:
        return [{ x: position.x + 1, y: position.y }, direction];
      case MapDirection.South:
        return [{ x: position.x, y: position.y + 1 }, direction];
      default:
        console.log(direction);
        return [{ x: -1, y: -1 }, MapDirection.None];
    }
  }

  public static canTurn(symbol: string, direction: MapDirection): boolean {
    if (symbol === MapLegend.HorizontalSymbol.toString() && (direction === MapDirection.North || direction === MapDirection.South)) {
      return false;
    } else if (symbol === MapLegend.VerticalSymbol.toString() && (direction === MapDirection.West || direction === MapDirection.East)) {
      return false;
    } else {
      return true;
    }
  }
}
