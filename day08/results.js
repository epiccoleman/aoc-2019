const { partition, countChar, resolvePixel } = require("./day08");
const { stringListFromInput } = require("../utils/utils");

function result1() {
    // The image you received is 25 pixels wide and 6 pixels tall.
    const chunkSize = 25 * 6;

    const data = stringListFromInput("./input.txt")[0].split('');

    let chunks = partition(data, chunkSize);

    let leastZeroes = 1000;
    let lzChunk;

    for(const chunk of chunks){
        let zeroes = countChar(chunk, "0");
        if(zeroes < leastZeroes){
            leastZeroes = zeroes;
            lzChunk = chunk;
        }
    }

    return countChar(lzChunk, "1") * countChar(lzChunk, "2");
}

function result2() {
    const chunkSize = 25 * 6;

    const data = stringListFromInput("./input.txt")[0].split('');

    let chunks = partition(data, chunkSize);

    let image = chunks[0].slice();
    console.log(image);

    image.forEach((pixel, index) => {
        if(pixel === "2"){
            image[index] = resolvePixel(chunks, index);
        };
    });

    let rows = partition(image, 25);
    for(const row of rows){
        console.log(row.map((x) => { return (x === "1" ) ? "#" : "." }).join(""))
    }
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 8:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();