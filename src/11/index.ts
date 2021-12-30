import { asArray } from '../utils/read-input';

const data = asArray('src/11/input.txt').map((row) => row.split('').map(Number));

const part1 = () => {
  const calcSteps = (maxDays: number) => {
    let totalFlashes = 0;
    calcStep(0, data);

    function calcStep(day: number, data: number[][]) {
      const stepData = data.map((row) => row.map((octopus) => octopus + 1));
      const flashed: number[][] = [];

      for (let y = 0; y < stepData.length; y++) {
        for (let x = 0; x < stepData[y].length; x++) {
          if (stepData[y][x] > 9 && !flashed.some((flash) => flash[0] === y && flash[1] === x)) {
            flashed.push([y, x]);
            raiseAdjesants(y, x);
          }
        }
      }

      for (let y = 0; y < stepData.length; y++) {
        for (let x = 0; x < stepData[y].length; x++) {
          if (stepData[y][x] > 9) {
            stepData[y][x] = 0;
            totalFlashes++;
          }
        }
      }

      if (day + 1 < maxDays) {
        calcStep(day + 1, stepData);
      }

      function raiseAdjesants(y: number, x: number) {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            const adjesant = stepData[y + i]?.[x + j];
            if (!(i === 0 && j === 0) && adjesant) {
              stepData[y + i][x + j]++;
            }

            if (
              stepData[y + i]?.[x + j] > 9 &&
              !flashed.some((flash) => flash[0] === y + i && flash[1] === x + j)
            ) {
              flashed.push([y + i, x + j]);
              raiseAdjesants(y + i, x + j);
            }
          }
        }
      }
    }

    return totalFlashes;
  };

  return calcSteps(100);
};

const part2 = () => {
  const calcSteps = () => {
    let step = 0;
    calcStep(data);

    function calcStep(data: number[][]) {
      step++;
      const stepData = data.map((row) => row.map((octopus) => octopus + 1));
      const flashed: number[][] = [];

      for (let y = 0; y < stepData.length; y++) {
        for (let x = 0; x < stepData[y].length; x++) {
          if (stepData[y][x] > 9 && !flashed.some((flash) => flash[0] === y && flash[1] === x)) {
            flashed.push([y, x]);
            raiseAdjesants(y, x);
          }
        }
      }

      let stepFlashes = 0;
      for (let y = 0; y < stepData.length; y++) {
        for (let x = 0; x < stepData[y].length; x++) {
          if (stepData[y][x] > 9) {
            stepData[y][x] = 0;
            stepFlashes++;
          }
        }
      }

      if (stepFlashes !== stepData.flatMap((row) => row).length) {
        calcStep(stepData);
      }

      function raiseAdjesants(y: number, x: number) {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            const adjesant = stepData[y + i]?.[x + j];
            if (!(i === 0 && j === 0) && adjesant) {
              stepData[y + i][x + j]++;
            }

            if (
              stepData[y + i]?.[x + j] > 9 &&
              !flashed.some((flash) => flash[0] === y + i && flash[1] === x + j)
            ) {
              flashed.push([y + i, x + j]);
              raiseAdjesants(y + i, x + j);
            }
          }
        }
      }
    }

    return step;
  };

  return calcSteps();
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
