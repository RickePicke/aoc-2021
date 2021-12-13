import { asArray } from '../utils/read-input';
const data = asArray('src/09/input.txt');

const part1 = () => {
  let sum = 0;
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    const rowLowPointCount = row
      .split('')
      .map(Number)
      .reduce((acc, curr, x) => {
        const adjesants = [];
        for (let i = -1; i < 2; i++) {
          if (i !== 0) {
            const adjesantY = data[y + i]?.[x];
            adjesantY && adjesants.push(parseInt(adjesantY));

            const adjesantX = data[y]?.[x + i];
            adjesantX && adjesants.push(parseInt(adjesantX));
          }
        }

        return adjesants.every((adjesant) => adjesant > curr) ? acc + curr + 1 : acc;
      }, 0);
    sum += rowLowPointCount;
  }

  return sum;
};

const print = (checked: number[][]) => {
  const coloredData = [
    Array(100).fill('9').join(''),
    ...data.map((row, i) => {
      return row
        .split('')
        .map((point, j) => (checked.some(([y, x]) => y === i && x === j) ? `\x1b[90m${point}\x1b[0m` : point))
        .join('');
    }),
    Array(100).fill('9').join(''),
  ];
  coloredData.forEach((row) => console.log(`9${row}9`));
};

const getBasin = (points: number[][]): number[][] => {
  return points
    .reduce((basinPoints: number[][], point) => {
      const nextBasins = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].reduce((acc: number[][], curr) => {
        const y = point[0] + curr[0];
        const x = point[1] + curr[1];

        const adjesant = Number(data[y]?.[x]);

        if (typeof adjesant === 'number' && adjesant < 9 && adjesant > Number(data[point[0]][point[1]])) {
          return [...acc, [y, x]];
        }
        return acc;
      }, []);

      return nextBasins.length ? [...basinPoints, ...getBasin(nextBasins)] : basinPoints;
    }, points)
    .reduce(
      (acc: number[][], curr) =>
        !acc.some(([y, x]) => curr[0] === y && curr[1] === x) ? [...acc, curr] : acc,
      []
    );
};

const part2 = () => {
  const basins: number[][][] = [];
  const checked: number[][] = [];
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    row
      .split('')
      .map(Number)
      .forEach((point, x) => {
        if (point !== 9 && !checked.some((basinPoint) => basinPoint[0] === y && basinPoint[1] === x)) {
          const point = [y, x];
          checked.push(point);
          basins.push(getBasin([point]));
        }
      });
  }

  print(checked);

  const sortedBasins = basins.map((basin) => basin.length).sort((a, b) => b - a);
  return sortedBasins[0] * sortedBasins[1] * sortedBasins[2];
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
