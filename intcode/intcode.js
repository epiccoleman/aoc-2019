const OPCODES = require("./opcodes");

class IntcodeComputer {
    constructor(memory, input = [], output = []){
        this.memory = memory;
        this.input = input;
        this.output = output;
        this.pc = 0;
        this.halted = false;
        this.paused = false;
    }

    execute(){
        while( ! ( this.halted || this.paused ) ){
            //grab instruction from memory
            let instruction = this.memory[this.pc];
            let opcodeNum = instruction % 100;

            if (opcodeNum < 1 && opcodeNum > 8 && opcodeNum != 99) { throw "bad opcodeNum" };

            let opcodeStr = String(instruction).padStart(5, "0");
            let modes = opcodeStr.slice(0,3).split("").reverse().map((i) => Number(i)); //gross, but get array of modes for each arg

            let opcode = OPCODES[opcodeNum];
            let args = this.memory.slice(this.pc+1, this.pc+opcode.argc+1);
            let pcBeforeOp = this.pc;

            opcode.operation(args, modes, this);

            //we'll only increment PC if the instruction didn't change it and if it wasn't a pause
            if ((pcBeforeOp == this.pc) && !(this.paused || this.halted)) this.pc += (opcode.argc + 1);
        }
        return 0;
    }

    receiveInput(input){
        this.paused = false; this.input.push(...input)
    }
}

module.exports = { IntcodeComputer };