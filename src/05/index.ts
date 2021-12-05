import { asArray } from '../utils/read-input';

const data = asArray('src/05/input.txt').map((line) =>
  line.split(' -> ').map((endCoords) => endCoords.split(',').map((n) => parseInt(n)))
);

const getNext = (delta: number, n: number) => {
  if (delta < 0) {
    return n + 1;
  } else if (delta > 0) {
    return n - 1;
  }
  return n;
};

const countOverlaps = (lineCoordinates: number[][][]) => {
  const xLength = Math.max(...lineCoordinates.flatMap(([[x1], [x2]]) => [x1, x2]));
  const yLength = Math.max(...lineCoordinates.flatMap(([[, y1], [, y2]]) => [y1, y2]));
  const grid: number[][] = [...Array(yLength + 1)].map(() => Array(xLength + 1).fill(0));

  lineCoordinates.forEach(([[x1, y1], [x2, y2]]) => {
    const deltaY = y1 - y2;
    const deltaX = x1 - x2;
    const length = Math.abs(deltaX || deltaY);

    let i = 0;
    let x = x1;
    let y = y1;

    while (i <= length) {
      grid[y][x] += 1;

      y = getNext(deltaY, y);
      x = getNext(deltaX, x);
      i++;
    }
  });

  return grid.flatMap((row) => row.filter((n) => n > 1)).length;
};

const part1 = () => {
  const lines = data.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);
  return countOverlaps(lines);
};

const part2 = () => {
  return countOverlaps(data);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
