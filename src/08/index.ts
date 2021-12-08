import { asArray } from '../utils/read-input';

const data = asArray('src/08/input.txt').map((line) =>
  line.split(' | ').map((chunk) => chunk.split(' ').map((segment) => segment.split('').sort().join('')))
);

const part1 = () => {
  const knonSegmentLengths = [2, 3, 4, 7];
  return data.reduce(
    (acc, [, segemnts]) =>
      acc + segemnts.filter((segemnt) => knonSegmentLengths.includes(segemnt.length)).length,
    0
  );
};

const part2 = () => {
  return data.reduce((acc, [signalPatterns, segments]) => {
    const getPatternByLength = (length: number) =>
      signalPatterns.find((pattern) => pattern.length === length) || '';

    const knowPatterns = {
      1: getPatternByLength(2),
      4: getPatternByLength(4),
      7: getPatternByLength(3),
      8: getPatternByLength(7),
    };

    const fiveCharPatterns = signalPatterns.filter(({ length }) => length === 5);
    const sixCharPatterns = signalPatterns.filter(({ length }) => length === 6);

    const [three] = fiveCharPatterns.filter((pattern) =>
      knowPatterns[1].split('').every((char) => pattern.includes(char))
    );

    const [nine] = sixCharPatterns.filter((pattern) =>
      knowPatterns[4].split('').every((char) => pattern.includes(char))
    );

    const [five] = fiveCharPatterns.filter(
      (pattern) => pattern !== three && pattern.split('').every((char) => nine.includes(char))
    );

    const [two] = fiveCharPatterns.filter((pattern) => pattern !== three && pattern !== five);

    const [six] = sixCharPatterns.filter(
      (pattern) => pattern !== nine && five.split('').every((char) => pattern.includes(char))
    );

    const [zero] = sixCharPatterns.filter((pattern) => pattern !== nine && pattern !== six);

    const patterns = {
      ...Object.entries(knowPatterns).reduce(
        (acc: { [key: string]: string }, [key, value]) => ({ ...acc, [value]: key }),
        {}
      ),
      [three]: '3',
      [nine]: '9',
      [five]: '5',
      [two]: '2',
      [six]: '6',
      [zero]: '0',
    };

    return acc + parseInt(segments.map((segment) => patterns[segment]).join(''));
  }, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
