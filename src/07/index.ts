import { asArray } from '../utils/read-input';

const [data] = asArray('src/07/input.txt').map((line) => line.split(',').map((n) => parseInt(n)));

const parseData = () => ({
  uniquePositions: [...new Set(data)],
  positionCounts: data.reduce(
    (acc: { [key: number]: number }, curr) => ({
      ...acc,
      [curr]: (acc[curr] || 0) + 1,
    }),
    {}
  ),
});

const part1 = () => {
  const { uniquePositions, positionCounts } = parseData();
  let cheepestPostionFuel;

  for (let i = 0; i < uniquePositions.length; i++) {
    const fuel = uniquePositions.reduce((acc, curr) => {
      const refPosition = uniquePositions[i];
      return acc + Math.abs(curr - refPosition) * positionCounts[curr];
    }, 0);

    if (!cheepestPostionFuel || fuel < cheepestPostionFuel) {
      cheepestPostionFuel = fuel;
    }
  }

  return cheepestPostionFuel;
};

const part2 = () => {
  const { uniquePositions, positionCounts } = parseData();
  const maxPosition = Math.max(...uniquePositions);
  let cheepestPostionFuel;

  for (let refPosition = 0; refPosition < maxPosition; refPosition++) {
    const fuel = uniquePositions.reduce((acc, curr) => {
      const distance = Math.abs(curr - refPosition);
      const fuelCost = (distance * (distance + 1)) / 2;

      return acc + fuelCost * positionCounts[curr];
    }, 0);

    if (!cheepestPostionFuel || fuel < cheepestPostionFuel) {
      cheepestPostionFuel = fuel;
    }
  }

  return cheepestPostionFuel;
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
