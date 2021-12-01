const run = async () => {
    const day = process.env.DAY || process.argv[2];
    if (day) {
        await import(`./${day}`);
    } else {
        console.log('😩 No day provided.');
    }
};

run();
