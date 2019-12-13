function partition(input, chunkSize){
    let chunks = [];
    for(let i = 0; i < input.length; i += chunkSize ){
        chunks.push(input.slice(i, i + chunkSize));
    };

    return chunks;
}

function countChar(input, char){
    return input.filter((i) => (char === i)).length;
}

function resolvePixel(chunks, index, chunkIndex = 0){
    let pixel = chunks[chunkIndex][index];
    if(pixel < 2){
        return pixel;
    } else { 
        return resolvePixel(chunks, index, chunkIndex + 1);
    }
}

module.exports = { partition, countChar, resolvePixel }