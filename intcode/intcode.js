const OPCODES = require("./opcodes");

class IntcodeComputer {
    constructor(memory, input = [], output = []){
        this.memory = memory;
        this.input = input;
        this.output = output;
        this.pc = 0;
    }

    execute(){
        let pc = 0; 
        // let halted = false;
        while( ! ( pc >= this.memory.length ) ){
            let instruction = this.memory[this.pc];
            let opcodeNum = instruction % 100;
            if (opcodeNum != 1 && opcodeNum != 2 && opcodeNum !=3 && opcodeNum !=4 && opcodeNum != 99) { throw "bad opcodeNum"};
            if (opcodeNum == 99) return 0;
            let opcodeStr = String(instruction).padStart(5, "0");
            let opcode = OPCODES[opcodeNum];

            let unprocessedArgs = this.memory.slice(this.pc+1, this.pc+opcode.argc+1);

            let args = [];

            if (opcodeNum >= 3 ) {
                // in or out
                args[0] = unprocessedArgs[0];
            } 
            else {
                // add or mul
                let param1Mode = Number(opcodeStr[2]);
                let param2Mode = Number(opcodeStr[1]);

                args[0] = param1Mode ? unprocessedArgs[0] : this.memory[unprocessedArgs[0]];
                args[1] = param2Mode ? unprocessedArgs[1] : this.memory[unprocessedArgs[1]];
                args[2] = unprocessedArgs[2];
            }

            console.log(`operation ${opcode.name} with args ${args}`);
            opcode.operation(args, this);

            this.pc += ( opcode.argc + 1 );
        }
            return 0;
    }
}

module.exports = { IntcodeComputer };