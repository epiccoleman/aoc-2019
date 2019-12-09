const { IntcodeComputer } = require("../intcode/intcode");
const { numberListFromInput } = require("../utils/utils");

function result1() {
    const initialMemory = numberListFromInput("./input.txt");

    const input = [1];
    const hal9000 = new IntcodeComputer(initialMemory, input);
    hal9000.execute();

    console.log(hal9000.output)
    return hal9000.output[hal9000.output.length - 1];
}

function result2() {
    // const input = numberListFromInput("./input.txt");

    // return input.reduce((acc, current) => (acc + calculateFuelRequirementPart2(current)), 0);
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 1:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();