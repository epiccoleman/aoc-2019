const OPCODES = require("./opcodes");

class IntcodeComputer {
    constructor(memory, input = [], output = []){
        this.memory = memory;
        this.input = input;
        this.output = output;
        this.pc = 0;
    }

    execute(){
        this.pc = 0; 
        // let halted = false;
        while( ! ( this.pc >= this.memory.length ) ){
            //grab instruction from memory
            let instruction = this.memory[this.pc];
            let opcodeNum = instruction % 100;

            //check for validity, halt if that's what we doin
            if (opcodeNum < 1 && opcodeNum > 8 && opcodeNum != 99) { throw "bad opcodeNum" };
            if (opcodeNum == 99) return 0;

            let opcodeStr = String(instruction).padStart(5, "0");
            let modes = opcodeStr.slice(0,3).split("").reverse().map((i) => Number(i)); //gross, but get array of modes for each arg

            // console.log(`grabbing opcodeNum at ${this.pc}: ${opcodeNum}`)
            let opcode = OPCODES[opcodeNum];
            let args = this.memory.slice(this.pc+1, this.pc+opcode.argc+1);
            let pcBeforeOp = this.pc;

            opcode.operation(args, modes, this);

            //we'll only increment PC if the instruction didn't change it
            if (pcBeforeOp == this.pc) this.pc += (opcode.argc + 1);
        }
        return 0;
    }
}

module.exports = { IntcodeComputer };