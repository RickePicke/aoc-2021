import { asArray } from '../utils/read-input';

const data = asArray('src/03/input.txt');
const startCount = { ones: 0, zeros: 0 };

const countDigitsAtIndex =
  (index: number) =>
  ({ ones, zeros }: { ones: number; zeros: number }, curr: string) => ({
    ones: curr[index] === '1' ? ones + 1 : ones,
    zeros: curr[index] === '0' ? zeros + 1 : zeros,
  });

const findByCriteria = (criteria: 'leastCommon' | 'mostCommon', numbers: string[], index: number): string => {
  return find(numbers, index);

  function find(numbers: string[], index: number): string {
    const digitCount = numbers.reduce(countDigitsAtIndex(index), startCount);
    const criterias = {
      mostCommon: digitCount.zeros > digitCount.ones ? '0' : '1',
      leastCommon: digitCount.zeros > digitCount.ones ? '1' : '0',
    };

    const filteredNumbers = numbers.filter((num) => num[index] === criterias[criteria]);
    return filteredNumbers.length === 1 ? filteredNumbers[0] : find(filteredNumbers, index + 1);
  }
};

const part1 = () => {
  const gamma = Array.from(Array(data[0].length).keys())
    .map((n) => data.reduce(countDigitsAtIndex(n), startCount))
    .map(({ ones, zeros }) => (ones > zeros ? '1' : '0'))
    .join('');

  const epsilon = gamma
    .split('')
    .map((n) => (n === '1' ? '0' : '1'))
    .join('');

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = () => {
  const oxygenGeneratorRating = findByCriteria('mostCommon', data, 0);
  const CO2ScrubberRating = findByCriteria('leastCommon', data, 0);
  return parseInt(oxygenGeneratorRating, 2) * parseInt(CO2ScrubberRating, 2);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
