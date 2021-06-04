import { MapLegend } from '../enum/MapLegend';
import { Position } from '../interface/Position';

export class MapValidator {
  public static validateMap(map: string[][]) {
    if (this.noSymbol(MapLegend.StartSymbol.toString(), map)) {
      throw 'Invalid map. No start point found.';
    } else if (this.noSymbol(MapLegend.EndSymbol.toString(), map)) {
      throw 'Invalid map. No end point found.';
    } else if (this.hasMultipleSymbols(MapLegend.StartSymbol.toString(), map)) {
      throw 'Invalid map. Multiple start points found.';
    } else if (this.hasMultipleSymbols(MapLegend.EndSymbol.toString(), map)) {
      throw 'Invalid map. Multiple end points found.';
    } else if (this.hasMultiplePaths(MapLegend.CornerSymbol, map)) {
      throw 'Invalid map. "T" fork found.';
    } else if (this.hasMultiplePaths(MapLegend.StartSymbol, map, 1)) {
      throw 'Invalid map. Multiple start paths found.';
    } else if (this.hasBrokenPath(map)) {
      throw 'Invalid map. Broken path found.';
    } else if (this.hasFakeTurn(map)) {
      throw 'Invalid map. Fake turn found.';
    }
  }

  private static noSymbol(symbol: string, map: string[][]): boolean {
    let noSymbol = true;
    map.forEach((row) => {
      if (row.includes(symbol)) noSymbol = false;
    });

    return noSymbol;
  }

  private static hasMultipleSymbols(symbol: string, map: string[][]) {
    let count = 0;
    map.forEach((row) => {
      row.forEach((char) => {
        if (char === symbol) count++;
      });
    });

    return count > 1;
  }

  private static hasMultiplePaths(symbol: string, map: string[][], maxCount: number = 2) {
    let multiple = false;

    map.forEach((row, rowId) => {
      row.forEach((char, charId) => {
        if (char === symbol) {
          let count = 0;
          const position: Position = { x: charId, y: rowId };
          try {
            if (map[position.y][position.x - 1] === MapLegend.HorizontalSymbol) count++;
            if (map[position.y][position.x + 1] === MapLegend.HorizontalSymbol) count++;
            if (map[position.y - 1][position.x] === MapLegend.VerticalSymbol) count++;
            if (map[position.y + 1][position.x] === MapLegend.VerticalSymbol) count++;
          } catch (error) {
            // eat the error, position is out of range...
          }

          if (count > maxCount) multiple = true;
        }
      });
    });

    return multiple;
  }

  private static hasBrokenPath(map: string[][]) {
    let broken = false;
    map.forEach((row, rowId) => {
      if (row.join('').trim() === '' && map[rowId - 1] && map[rowId + 1]) {
        broken = true;
      }
    });

    return broken;
  }

  private static hasFakeTurn(map: string[][]): boolean {
    let fake = false;
    map.forEach((row, rowId) => {
      row.forEach((char, charId) => {
        if (char === MapLegend.CornerSymbol.toString()) {
          const p: Position = { x: charId, y: rowId };
          try {
            if (map[p.y][p.x - 1] === MapLegend.HorizontalSymbol && map[p.y][p.x + 1] === MapLegend.HorizontalSymbol) {
              fake = true;
            }
            if (map[p.y - 1][p.x] === MapLegend.VerticalSymbol && map[p.y + 1][p.x] === MapLegend.VerticalSymbol) {
              fake = true;
            }
          } catch (error) {
            // eat the error, position is out of range...
          }
        }
      });
    });

    return fake;
  }
}
