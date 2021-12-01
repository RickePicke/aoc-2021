import { readFileSync } from 'fs';
import { resolve } from 'path';

export const asArray = (filename: string): string[] => {
    return readFileSync(resolve(process.cwd(), filename), 'utf8')
        .split('\n')
        .map((line) => line.trim());
};
