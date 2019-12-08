const OPCODES = {
    1: {
        name: "add",
        args: 3,
        operation: (args, computer) => {
            let a = args[0];
            let b = args[1];
            let target = args[2];

            computer.memory[target] = a + b;
        }
    },
    2: {
        name: "multiply",
        args: 3,
        operation: (args, computer) => {
            let a = args[0];
            let b = args[1];
            let target = args[2];

            computer.memory[target] = a * b;
        }
    },
    3: {
        name: "input",
        args: 1,         
        operation: (args, computer) => {
            let input = computer.input.shift();
            let target = args[0];

            computer.memory[target] = input;
        }
    },
    4: {
        name: "output",
        args: 1,
        operation: (args, computer) => {
            let value = computer.memory[args[0]];
            computer.output.push(value);
        }
    },
    99: {
        name: "halt",
        args: 0,
        operation: () => {}
    }
};

module.exports = OPCODES;