import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';

const day = process.argv[2];
const dirPath = `src/${day}`;
const templatesDir = 'templates/day';
if (existsSync(dirPath)) {
    console.error(`❌ ${dirPath} already exists.`);
} else if (!day) {
    console.error('😩 No day provided.');
} else {
    mkdirSync(dirPath);
    readdirSync(templatesDir).forEach((fileName) => {
        const content = readFileSync(`${templatesDir}/${fileName}`, 'utf8').replace('${DAY}', day);
        writeFileSync(`${dirPath}/${fileName.replace('.template', '')}`, content);
    });

    console.log(
        `✅ Done!\n\n${readdirSync(dirPath)
            .map((fileName) => `${dirPath}/${fileName}`)
            .join('\n')}`
    );
}
