const OPCODES = {
    1: {
        name: "add",
        argc: 3,
        writeParam: 2,
        operation: ([a, b, target], computer) => {
            computer.memory[target] = a + b;
        }
    },
    2: {
        name: "multiply",
        argc: 3,
        writeParam: 2,
        operation: ([a, b, target], computer) => {
            computer.memory[target] = a * b;
        }
    },
    3: {
        name: "input",
        argc: 1,         
        writeParam: 0,
        operation: ([target], computer) => {
            if (computer.input.length === 0) { computer.paused = true; return; }
            let input = computer.input.shift();

            computer.memory[target] = input;
        }
    },
    4: {
        name: "output",
        argc: 1,
        operation: ([value], computer) => {
            computer.output.push(value);
        }
    },
    5: {
        name: "jump-if-true", 
        argc: 2,
        operation: ([a, b], computer) => {
            if(a !== 0) {
                computer.pc = b;
            }
        }
    },
    6: {
        name: "jump-if-false", 
        argc: 2,
        operation: ([a, b], computer) => {
            if(a === 0) {
                computer.pc = b;
            }
        }
    },
    7: {
        name: "less-than", 
        argc: 3,
        writeParam: 2,
        operation: ([a, b, target], computer) => {
            computer.memory[target] = (a < b) ? 1 : 0;
        }
    },
    8: {
        name: "equals", 
        argc: 3,
        writeParam: 2,
        operation: ([a, b, target], computer) => {
            computer.memory[target] = (a == b) ? 1 : 0;
        }
    },
    9: {
        name: "relbase", 
        argc: 1,
        operation: ([a], computer) => {
            computer.relativeBase += a;
        }
    },
    99: {
        name: "halt",
        argc: 0,
        operation: (_, computer) => {
            computer.halted = true;
        }
    }
};

module.exports = OPCODES;