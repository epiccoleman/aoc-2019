const { checkPassword, checkPassword2 } = require("./day04");
const { Range } = require("../utils/mathyUtils");

// Your puzzle input is 134792-675810.
const inputRange = new Range(134792, 675810);

function result1() {
    let validPasswordCount = 0;
    for (let i = inputRange.start; i <= inputRange.end; i++){
        if( checkPassword(i, inputRange) ) validPasswordCount++;
    }

    return validPasswordCount;

}

function result2() {
    let validPasswordCount = 0;
    for (let i = inputRange.start; i <= inputRange.end; i++){
        if( checkPassword2(i, inputRange) ) validPasswordCount++;
    }

    return validPasswordCount;
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 1:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();