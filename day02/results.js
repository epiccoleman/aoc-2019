const { executeIntcode } = require("./day02");
const { numberListFromInput } = require('../utils/utils');

function result1() {
    const input = numberListFromInput("./input.txt");

    //before running the program, replace position 1 with the value 12 and 
    //replace position 2 with the value 2. What value is left at position 0 after the program halts?

    input[1] = 12;
    input[2] = 2;

    return executeIntcode(input)[0];
}

function result2() {
    const original_input = numberListFromInput("./input.txt");
    const target = 19690720;

    let thing = [0,0];
    for(var i = 0; i <= 99; i++){
        for(var j = 0; j <= 99; j++){
            let input = [...original_input];
            input[1] = i;
            input[2] = j;

            if(executeIntcode(input)[0] == target){
                thing = [i, j];
            }
        }
    }

    //Find the input noun and verb that cause the program to produce the output 19690720. What is 100 * noun + verb?
    return 100 * thing[0] + thing[1];
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 2:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();