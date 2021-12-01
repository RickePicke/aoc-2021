import { asArray } from '../utils/read-input';

const data = asArray('src/01/input.txt').map((n) => parseInt(n));

const countIncrements = (data: number[]) =>
    data.reduce((acc: number, curr, i) => acc + (i > 0 && curr > data[i - 1] ? 1 : 0), 0);

const part1 = () => {
    console.log('Part 1: ', countIncrements(data));
};

const part2 = () => {
    const windows = data.map((_, i) => data.slice(i, i + 3).reduce((acc, curr) => acc + curr), []);
    console.log('Part 2: ', countIncrements(windows));
};

part1();
part2();
