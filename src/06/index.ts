import { sum } from '../utils/math';
import { asArray } from '../utils/read-input';

const data = asArray('src/06/input.txt')[0]
  .split(',')
  .map((n) => parseInt(n));

const checkDays = (maxDays: number): number => {
  const emptySchool = Array(9).fill(0);
  const timers = [...emptySchool].map((_, i) => data.filter((n) => i === n).length);

  return sum(checkDay(1, timers));

  function checkDay(day: number, timers: number[]): number[] {
    const nextTimers = [...emptySchool];
    nextTimers[6] += timers[0];
    nextTimers[8] += timers[0];

    for (let i = 1; i < 9; i++) {
      nextTimers[i - 1] = nextTimers[i - 1] + timers[i];
    }

    return day < maxDays ? checkDay(day + 1, nextTimers) : nextTimers;
  }
};

const part1 = () => {
  return checkDays(80);
};

const part2 = () => {
  return checkDays(256);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
