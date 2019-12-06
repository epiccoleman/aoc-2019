const { calculateFuelRequirement, calculateFuelRequirementPart2 } = require("./day01");
const { numberListFromInput } = require('../utils/utils');

const DAY_NUMBER = 01;

function result1() {
    const input = numberListFromInput("./input.txt");

    return input.reduce((acc, current) => (acc + calculateFuelRequirement(current)), 0);
}

function result2() {
    const input = numberListFromInput("./input.txt");

    return input.reduce((acc, current) => (acc + calculateFuelRequirementPart2(current)), 0);
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 1:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();