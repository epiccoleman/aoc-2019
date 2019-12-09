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
            if (opcodeNum < 1 && opcodeNum > 9 && opcodeNum != 99) { throw "bad opcodeNum" };
            if (opcodeNum == 99) return 0;

            let opcodeStr = String(instruction).padStart(5, "0");
            let modes = opcodeStr.slice(0,3).split("").reverse().map((i) => Number(i)); //gross, but get array of modes for each arg

            let opcode = OPCODES[opcodeNum];

            let args = this.memory.slice(this.pc+1, this.pc+opcode.argc+1);

            // let args = [];

            // if (opcodeNum >= 3 ) {
            //     // in or out
            //     args[0] = unprocessedArgs[0];
            // } 
            // else {
            //     // add or mul
            //     let param1Mode = Number(opcodeStr[2]);
            //     let param2Mode = Number(opcodeStr[1]);

            //     args[0] = param1Mode ? unprocessedArgs[0] : this.memory[unprocessedArgs[0]];
            //     args[1] = param2Mode ? unprocessedArgs[1] : this.memory[unprocessedArgs[1]];
            //     args[2] = unprocessedArgs[2];
            // }

            console.log(`operation ${opcode.name} with args ${args}`);
            
            let pcBeforeOp = this.pc;
            opcode.operation(args, modes, this);
            if (pcBeforeOp == this.pc); this.pc += (opcode.argc + 1);
        }
            return 0;
    }
}

module.exports = { IntcodeComputer };