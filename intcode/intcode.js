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
        while( ! ( pc >= this.memory.length ) ){
            let opcode = this.getInstruction(pc)
            if (opcode != 1 && opcode != 2 && opcode != 99) { throw "bad opcode"};
            if (opcode == 99) break;

            let a_loc = this.memory[pc+1]
            let b_loc = this.memory[pc+2]
            let out_loc = this.memory[pc+3]

            // console.log(`opcode: ${opcode}, a: ${a}, b: ${b}, target: ${target}`)

            switch(opcode) {
                case 1:
                    this.memory[out_loc] = this.memory[a_loc] + this.memory[b_loc];
                    break;
                case 2:
                    this.memory[out_loc] = this.memory[a_loc] * this.memory[b_loc];
                    break
            }

            pc += 4;
        }
    }

    // processInstruction(position){
    //     let opcode = this.memory[position];

    // }
}

