import { sum } from '../utils/math';
import { asArrayBlocks } from '../utils/read-input';
const data = asArrayBlocks('src/04/input.txt');
const numbers = data[0].split(',');
const boards = data.slice(1).map((board) =>
  board.split('\n').reduce((acc: string[][], row) => {
    const numbers = row.match(/.{1,3}/g)?.map((n) => n.trim());
    return numbers ? [...acc, numbers] : acc;
  }, [])
);

const rotate90Deg = (board: string[][]) => {
  const N = board.length - 1; // use a constant
  const result = board.map((row, i) => row.map((_, j) => board[N - j][i]));
  board.length = 0; // hold original array reference
  board.push(...result); // Spread operator
  return board;
};

const getHorizontalBingo = (board: string[][]) =>
  board
    .filter((row) => row.every((n) => numbers.includes(n)))
    .reduce(
      (acc: { score: number; lastNumber: string; unmarkedNumbersSum: number }, row) => {
        let lastNumber = '';
        const usedNumbers: string[] = [];
        for (let i = 0; i <= numbers.length; i++) {
          usedNumbers[i] = numbers[i];
          if (row.every((n) => numbers.slice(0, i + 1).includes(n))) {
            lastNumber = numbers[i];
            i = numbers.length;
          }
        }
        const score = numbers.indexOf(lastNumber);

        if (!acc.score || score < acc.score) {
          const unmarkedNumbersSum = sum(
            board.map((row) => sum(row.filter((n) => !usedNumbers.includes(n)).map((n) => parseInt(n))))
          );
          return { score, lastNumber, unmarkedNumbersSum };
        }
        return acc;
      },
      {
        score: 0,
        unmarkedNumbersSum: 0,
        lastNumber: '',
      }
    );

const getVerticalBingo = (board: string[][]) => getHorizontalBingo(rotate90Deg(board));

const part1 = () => {
  const [{ unmarkedNumbersSum, lastNumber }] = boards
    .map((board) => {
      const [bingo] = [getHorizontalBingo(board), getVerticalBingo(board)]
        .filter(({ score }) => score)
        .sort((a, b) => a.score - b.score);
      return bingo;
    })
    .sort((a, b) => a.score - b.score);
  return parseInt(lastNumber) * unmarkedNumbersSum;
};

const part2 = () => {
  const [{ unmarkedNumbersSum, lastNumber }] = boards
    .map((board) => {
      const [bingo] = [getVerticalBingo(board), getVerticalBingo(board)].sort((a, b) => a.score - b.score);
      return bingo;
    })
    .sort((a, b) => b.score - a.score);
  return parseInt(lastNumber) * unmarkedNumbersSum;
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
