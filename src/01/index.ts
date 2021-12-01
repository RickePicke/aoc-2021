import { asArray } from '../utils/read-input';

const data = asArray('src/01/input.txt').map((n) => parseInt(n));

const countIncrements = (data: number[]) =>
    data.reduce((acc: number, curr, i) => acc + (i > 0 && curr > data[i - 1] ? 1 : 0), 0);

const part1 = () => {
    return countIncrements(data);
};

const part2 = () => {
    const windows = data.map((_, i) => data.slice(i, i + 3).reduce((acc, curr) => acc + curr), []);
    return countIncrements(windows);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
