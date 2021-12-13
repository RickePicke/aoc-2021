import { asArray } from '../utils/read-input';

const data = asArray('src/10/input.txt');
const tagsMap: { [key: string]: string } = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const isClosingTag = (tag: string) => Object.values(tagsMap).some((closingTag) => closingTag === tag);

const checkLine = (line: string) => {
  const expectedClosingTags: string[] = [];
  let illegalChar = '';
  for (let i = 0; i < line.length; i++) {
    const tag = line[i];
    if (isClosingTag(tag)) {
      if (expectedClosingTags[0] === tag) {
        expectedClosingTags.shift();
      } else {
        illegalChar = tag;
        i = line.length;
      }
    } else {
      expectedClosingTags.unshift(tagsMap[tag]);
    }
  }

  return {
    illegalChar,
    expectedClosingTags,
  };
};

const part1 = () => {
  const illigalCharsCount = data.reduce(
    (acc: { [key: string]: number }, line) => {
      const { illegalChar } = checkLine(line);
      return illegalChar ? { ...acc, [illegalChar]: (acc[illegalChar] || 0) + 1 } : acc;
    },
    Object.values(tagsMap).reduce((acc, tag) => ({ ...acc, [tag]: 0 }), {})
  );

  return (
    illigalCharsCount[')'] * 3 +
    illigalCharsCount[']'] * 57 +
    illigalCharsCount['}'] * 1197 +
    illigalCharsCount['>'] * 25137
  );
};

const part2 = () => {
  const charPointsMap: { [key: string]: number } = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  const autoCompleteScores = data
    .reduce((sums: number[], line) => {
      const { illegalChar, expectedClosingTags } = checkLine(line);

      return !illegalChar
        ? [...sums, expectedClosingTags.reduce((sum: number, tag) => sum * 5 + charPointsMap[tag], 0)]
        : sums;
    }, [])
    .sort((a, b) => a - b);

  const half = Math.floor(autoCompleteScores.length / 2);
  return autoCompleteScores[half];
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
