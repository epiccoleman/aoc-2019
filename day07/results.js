const { AmpController } = require("./day07");
const { numberListFromInput } = require('../utils/utils');

function result1() {
    const input = numberListFromInput("./input.txt");
    const ampController = new AmpController(input);

    return ampController.testAllPhaseSequences().bestSignal;
}

function result2() {
    return 'buttz';

}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 2:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();