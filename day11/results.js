const { IntcodeComputer } = require(`${__dirname}/../intcode/intcode`);
const { numberListFromInput } = require(`${__dirname}/../utils/utils`);

function result1() {
    const initialMemory = numberListFromInput(`${__dirname}/input.txt`);

    const input = [1];
    const skynet = new IntcodeComputer(initialMemory, input);
    skynet.execute();

    return skynet.output;
}

function result2() {
    const initialMemory = numberListFromInput(`${__dirname}/input.txt`);

    const input = [2];
    const SHODAN = new IntcodeComputer(initialMemory, input);
    SHODAN.execute();

    return SHODAN.output;
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 9:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();