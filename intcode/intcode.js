const OPCODES = require("./opcodes");

class IntcodeComputer {
    constructor(memory, input = [], output = []){
        this.memory = memory;
        this.input = input;
        this.output = output;
        this.pc = 0;
        this.relativeBase = 0;
        this.halted = false;
        this.paused = false;
    }

    execute(){
        while( ! ( this.halted || this.paused ) ){
            //grab instruction from memory
            let instruction = this.memory[this.pc];
            let modes = IntcodeComputer.getInstructionModes(instruction);

            let opcodeNum = instruction % 100;
            if (!(opcodeNum in OPCODES)) { throw "Tried to run a non-existent opcode" };

            let opcode = OPCODES[opcodeNum];

            // get and process arguments 
            let args = this.memory.slice(this.pc+1, this.pc+opcode.argc+1);

            let processedArgs = [];
            for(let i = 0; i < args.length; i++){
               processedArgs[i] = this.getMemory(args[i], modes[i]);
            }

            // don't 'deference' the arg if it's a location to write to.
            if('writeParam' in opcode){
                const i = opcode.writeParam;
                processedArgs[i] = (modes[i] === 2) ? args[i] + this.relativeBase : args[i];
            }

            let pcBeforeOp = this.pc;
            opcode.operation(processedArgs, this);

            //we'll only increment PC if the instruction didn't change it and if it wasn't a pause
            if ((pcBeforeOp == this.pc) && !(this.paused || this.halted)) this.pc += (opcode.argc + 1);
        }
        return 0;
    }

    receiveInput(input){
        this.paused = false; this.input.push(...input)
    }

    getMemory(position, mode){
        switch(mode) {
            case 0: //position mode
                return this.memory[position] ? this.memory[position] : 0;
                break;
            case 1: //immediate mode
                return position;
                break;
            case 2: //relative mode
                return this.memory[position + this.relativeBase] ? this.memory[position + this.relativeBase] : 0;
                break;
        }
    }

    flushOutput() { 
        this.output = [];
    }

    static getInstructionModes(instruction){
        let instructionStr = String(instruction).padStart(5, "0");
        return instructionStr.slice(0,3).split("").reverse().map(Number); //gross, but get array of modes for each arg
    }
}

module.exports = { IntcodeComputer };