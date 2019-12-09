const OPCODES = require("./opcodes");
// position mode: 0, immediate mode: 1

describe('Opcode 1: add', () => {
  it('adds the two inputs in position mode and writes them to the correct position in the given memory', () => {
    let addOpcode = OPCODES[1];

    let args = [1, 1, 0];
    let modes = [0, 0, 0]
    let computer = {memory: [0, 2, 0, 0, 99]};

    addOpcode.operation(args, modes, computer);

    expect(computer.memory[0]).toBe(4);
  });

  it('adds the two inputs in immediate mode and writes them to the correct position in the given memory', () => {
    let addOpcode = OPCODES[1];

    let args = [3, 4, 0];
    let modes = [1, 1, 0]
    let computer = {memory: []};

    addOpcode.operation(args, modes, computer);

    expect(computer.memory[0]).toBe(7);
  });
});

describe('Opcode 2: multiply', () => {
  it('multiplies the two inputs in immediate mode and writes them to the correct position in the given memory', () => {
    let multiplyOpcode = OPCODES[2];

    let args = [2, 21, 1];
    let modes = [1, 1, 0]
    let computer = {memory: []};

    multiplyOpcode.operation(args, modes, computer);

    expect(computer.memory[1]).toBe(42);
  });

  it('multiplies the two inputs in position mode and writes them to the correct position in the given memory', () => {
    let multiplyOpcode = OPCODES[2];

    let args = [2, 3, 1];
    let modes = [0, 0, 0]
    let computer = {memory: [0, 1, 6, 7, 4]};

    multiplyOpcode.operation(args, modes, computer);

    expect(computer.memory[1]).toBe(42);
  });
});

// describe('Opcode 3: input', () => {
//   it('receives input and writes it to the given memory location', () => {
//     let inputOpcode = OPCODES[3];

//     let args = [0];
//     let computer = {memory: [], input: [123]};

//     inputOpcode.operation(args, computer);

//     expect(computer.input).toStrictEqual([]);
//     expect(computer.memory[0]).toBe(123);
//   });
// });

// describe('Opcode 4: output', () => {
//   it('outputs the value at the given memory location', () => {
//     let outputOpcode = OPCODES[4];

//     let args = [0];
//     let computer = {memory: [42], output: []};

//     outputOpcode.operation(args, computer);

//     expect(computer.output).toStrictEqual([42]);
//     expect(computer.memory[0]).toBe(42);
//   });
// });

// describe('Opcode 5: jump-if-true', () => {
//   it('sets the instruction pointer to param 2 if param 1 is non-zero', () => {
//     let jumpIfTrueOpcode = OPCODES[5];

//     let args = [1, 23];
//     let computer = {memory: []};

//     jumpIfTrueOpcode.operation(args, computer);

//     expect(computer.pc).toBe(23);
//   });

//   it('does not change the IP if param 1 is zero', () => {
//     let jumpIfTrueOpcode = OPCODES[5];

//     let args = [0, 23];
//     let computer = {memory: []};

//     jumpIfTrueOpcode.operation(args, computer);

//     expect(computer.pc).toBe(23);
//   });
// });