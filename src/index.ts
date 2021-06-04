import { readFileSync, readdirSync } from 'fs';
import { PathFinder } from './service/PathFinder';
import { AsciiMap } from './model/AsciiMap';

const solveMap = (path: string): boolean => {
  const data = readFileSync(path, { encoding: 'utf8' });
  try {
    const map = AsciiMap.fromString(data.toString());
    const pathFinder = new PathFinder(map);
    const solution = pathFinder.solve();

    console.log('Letters: ', solution.letters.join(''));
    console.log('Path as characters: ', solution.path.join(''));
    return true;
  } catch (error) {
    console.error('ERROR: ', error);
    return false;
  }
};

const start = () => {
  const mapsRoot: string = `${__dirname}/../data`;
  const mapFiles: string[] = readdirSync(mapsRoot);

  const solved: string[] = [];
  const errors: string[] = [];

  mapFiles.forEach((filename: string) => {
    if (filename.includes('m')) {
      console.info(`Solving ${filename}`);
      if (solveMap(`${mapsRoot}/${filename}`)) {
        solved.push(filename);
      } else {
        errors.push(filename);
      }
      console.log('----------------\n');
    }
  });
  console.info(`Solutions found: (${solved.length}) ${solved.join(', ')}`);
  console.info(`Errors found: (${errors.length}) ${errors.join(', ')}`);
};

start();
