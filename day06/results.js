const { OrbitGraph } = require("./day06");
const { stringListFromInput } = require("../utils/utils");

function result1() {
    let input = stringListFromInput("./input.txt");
    let orbitGraph = new OrbitGraph(input);

    return orbitGraph.countOrbits();
}

function result2() {
    return 0;
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 1:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();