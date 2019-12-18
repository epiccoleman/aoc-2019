const { HullRobot } = require(`${__dirname}/day11`);
const { numberListFromInput } = require(`${__dirname}/../utils/utils`);

function result1() {
    const program = numberListFromInput(`${__dirname}/input.txt`);

    const wallE = new HullRobot(program);

    return wallE.countVisitedSquares();
}

function result2() {
    const program = numberListFromInput(`${__dirname}/input.txt`);

    const eve = new HullRobot(program);

    eve.getIdentifier();
    eve.printBoard();

    console.log("output a little messed up, but vim shaped it up into this:")
    console.log(
`
###..####.###..#..#.####.#..#.###...##...
#..#.#....#..#.#..#....#.#..#.#..#.#..#...
###..###..#..#.#..#...#..#..#.#..#.#......
#..#.#....###..#..#..#...#..#.###..#.....
#..#.#....#....#..#.#....#..#.#....#..#
###..#....#.....##..####..##..#.....##..
`
    )
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 9:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();