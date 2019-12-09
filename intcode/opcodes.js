const OPCODES = {
    1: {
        name: "add",
        argc: 3,
        operation: (args, modes, computer) => {
            let a = modes[0] ? args[0] : computer.memory[args[0]];
            let b = modes[1] ? args[1] : computer.memory[args[1]];
            let target = args[2];

            computer.memory[target] = a + b;
            computer.pc += ( [1].argc + 1 );
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
        operation: (args, modes, computer) => {
            let input = computer.input.shift();
            let target = args[0];

            computer.memory[target] = input;
        }
    },
    4: {
        name: "output",
        argc: 1,
        operation: (args, modes, computer) => {
            let value = computer.memory[args[0]];
            computer.output.push(value);
        }
    },
    5: {
        name: "jump-if-true", 
        argc: 2,
        operation: (args, modes, computer) => {
            if(args[0] != 0) {
                computer.pc = args[1]
            }
        }
    },
    6: {
        name: "jump-if-false", 
        argc: 2,
        operation: (args, modes, computer) => {

        }
    },
    7: {
        name: "less-than", 
        argc: 3,
        operation: (args, modes, computer) => {

        }
    },
    8: {
        name: "equals", 
        argc: 3,
        operation: (args, modes, computer) => {

        }
    },
    99: {
        name: "halt",
        argc: 0,
        operation: () => {}
    }
};

module.exports = OPCODES;