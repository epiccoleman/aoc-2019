const OPCODES = require("./opcodes");

describe('Opcode 1: ADD', () => {
  it('adds the two inputs and writes them to the correct position in the given memory', () => {
    let addOpcode = OPCODES[1];

    let args = [1, 1, 0];
    let computer = {memory: []};

    addOpcode.operation(args, computer);

    expect(computer.memory[0]).toBe(2);
  });
});

describe('Opcode 2: MULTIPLY', () => {
  it('multiplies the two inputs and writes them to the correct position in the given memory', () => {
    let multiplyOpcode = OPCODES[2];

    let args = [2, 21, 1];
    let computer = {memory: []};

    multiplyOpcode.operation(args, computer);

    expect(computer.memory[1]).toBe(42);
  });
});

describe('Opcode 3: INPUT', () => {
  it('receives input and writes it to the given memory location', () => {
    let inputOpcode = OPCODES[3];

    let args = [0];
    let computer = {memory: [], input: [123]};

    inputOpcode.operation(args, computer);

    expect(computer.input).toStrictEqual([]);
    expect(computer.memory[0]).toBe(123);
  });
});

describe('Opcode 4: OUTPUT', () => {
  it('outputs the value at the given memory location', () => {
    let outputOpcode = OPCODES[4];

    let args = [0];
    let computer = {memory: [42], output: []};

    outputOpcode.operation(args, computer);

    expect(computer.output).toStrictEqual([42]);
    expect(computer.memory[0]).toBe(42);
  });
});