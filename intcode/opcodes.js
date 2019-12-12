const OPCODES = {
    1: {
        name: "add",
        argc: 3,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            let target = args[2];

            computer.memory[target] = a + b;
        }
    },
    2: {
        name: "multiply",
        argc: 3,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            let target = args[2];

            computer.memory[target] = a * b;
        }
    },
    3: {
        name: "input",
        argc: 1,         
        operation: (args, _, computer) => {
            if (computer.input.length === 0) { computer.paused = true; return; }
            let input = computer.input.shift();
            let target = args[0];

            computer.memory[target] = input;
        }
    },
    4: {
        name: "output",
        argc: 1,
        operation: (args, modes, computer) => {
            let value = modes[0] ? args[0] : computer.memory[args[0]];
            computer.output.push(value);
        }
    },
    5: {
        name: "jump-if-true", 
        argc: 2,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            if(a !== 0) {
                computer.pc = b;
            }
        }
    },
    6: {
        name: "jump-if-false", 
        argc: 2,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            if(a === 0) {
                computer.pc = b;
            }
        }
    },
    7: {
        name: "less-than", 
        argc: 3,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            let target = args[2];

            computer.memory[target] = (a < b) ? 1 : 0;
        }
    },
    8: {
        name: "equals", 
        argc: 3,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            let target = args[2];

            computer.memory[target] = (a == b) ? 1 : 0;
        }
    },
    99: {
        name: "halt",
        argc: 0,
        operation: (_0, _1, computer) => {
            computer.halted = true;
        }
    }
};

module.exports = OPCODES;