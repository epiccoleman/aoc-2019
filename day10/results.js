const { enumerateAsteroids, countVisibleAsteroids, vaporizeAsteroids } = require(`${__dirname}/day10`);
const { stringListFromInput } = require(`${__dirname}/../utils/utils`);

function result1() {
    const data = stringListFromInput(`${__dirname}/input.txt`);
    const asteroids = enumerateAsteroids(data);

    let counts = asteroids.map((asteroid) => ( { count: countVisibleAsteroids(asteroid, asteroids), asteroid: asteroid } ));

    return Math.max(...counts); //awwwright
}

function result2() {
    const data = stringListFromInput(`${__dirname}/testInput4.txt`);
    const asteroids = enumerateAsteroids(data);

    let destroyed = vaporizeAsteroids([11, 13], asteroids);
    return destroyed[199];
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 10:");
    // console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();