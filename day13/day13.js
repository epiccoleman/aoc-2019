const { IntcodeComputer } = require(`../intcode/intcode`);
const { numberListFromInput } = require(`${__dirname}/../utils/utils`);

const ARCADE_CODE = numberListFromInput(`${__dirname}/input.txt`);

class ArcadeCabinet { 
    constructor(){
        this.board = {}
        this.computer = new IntcodeComputer(ARCADE_CODE);
    }

    step(){
        this.computer.execute();
        let boardState = this.computer.output;
        this.computer.flushOutput();
        partition(boardState, 3).forEach(([x, y, tile]) => {
            this.board[[x,y]] = tile;
        });
    }

    part1(){
        this.step();

        let count = 0;
        for(let loc in this.board){
            if(this.board[loc] === 2) count++;
        }

        return count;
    }
}

function partition(input, chunkSize){
    let chunks = [];
    for(let i = 0; i < input.length; i += chunkSize ){
        chunks.push(input.slice(i, i + chunkSize));
    };

    return chunks;
}

module.exports = { ArcadeCabinet }