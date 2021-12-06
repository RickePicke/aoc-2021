import { sum } from '../utils/math';
import { asArray } from '../utils/read-input';

const data = asArray('src/06/input.txt')[0]
  .split(',')
  .map((n) => parseInt(n));

type TimerCountMap = { [key: number]: number };

const checkDays = (maxDays: number): number => {
  const timers = data.reduce((acc: TimerCountMap, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }), {});
  const result = checkDay(1, timers);

  return sum(Object.values(result));

  function checkDay(day: number, timers: TimerCountMap): TimerCountMap {
    const nextTimers: TimerCountMap = {
      6: timers[0] || 0,
      8: timers[0] || 0,
    };

    for (let i = 1; i < 9; i++) {
      nextTimers[i - 1] = (nextTimers[i - 1] || 0) + (timers[i] || 0);
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
