import { asArray } from '../utils/read-input';

const commandValueMap = asArray('src/02/input.txt').map((line) => {
  const [, command, value] = /([a-z].*)\s(\d.*)/.exec(line) || [];
  return { command, value: parseInt(value) };
});

const part1 = () => {
  const { horizontal, depth } = commandValueMap.reduce(
    (acc: { depth: number; horizontal: number }, { command, value }) => {
      switch (command) {
        case 'up':
          return { ...acc, depth: acc.depth + value };
        case 'down':
          return { ...acc, depth: acc.depth - value };
        case 'forward':
          return { ...acc, horizontal: acc.horizontal + value };
        default:
          return acc;
      }
    },
    { horizontal: 0, depth: 0 }
  );

  return horizontal * Math.abs(depth);
};

const part2 = () => {
  const { depth, horizontal } = commandValueMap.reduce(
    (acc: { depth: number; aim: number; horizontal: number }, { command, value }) => {
      switch (command) {
        case 'up':
          return { ...acc, aim: acc.aim - value };
        case 'down':
          return { ...acc, aim: acc.aim + value };
        case 'forward':
          return {
            ...acc,
            horizontal: acc.horizontal + value,
            depth: acc.depth + acc.aim * value,
          };
        default:
          return acc;
      }
    },
    { aim: 0, depth: 0, horizontal: 0 }
  );

  return horizontal * Math.abs(depth);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
