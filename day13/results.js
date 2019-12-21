const { ArcadeCabinet } = require(`${__dirname}/day13`);

function result1() {
    const arcadeCabinet = new ArcadeCabinet();

    return arcadeCabinet.part1();
}

function result2() {
    return 'toot';
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 9:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();