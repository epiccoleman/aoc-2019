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

describe('Opcode 3: input', () => {
  it('receives input and writes it to the given memory location', () => {
    let inputOpcode = OPCODES[3];

    let args = [0];
    let modes = [];
    let computer = {memory: [], input: [123]};

    inputOpcode.operation(args, modes, computer);

    expect(computer.input).toStrictEqual([]);
    expect(computer.memory[0]).toBe(123);
  });

  it('when there is nothing in input it pauses the computer', () => {
    let inputOpcode = OPCODES[3];

    let args = [0];
    let modes = [];
    let computer = {memory: [], input: []};

    inputOpcode.operation(args, modes, computer);

    expect(computer.paused).toBe(true);
  });
});

describe('Opcode 4: output', () => {
  it('outputs the given value in immediate mode', () => {
    let outputOpcode = OPCODES[4];

    let args = [237]
    let modes = [1];
    let computer = {memory: [], output: []};

    outputOpcode.operation(args, modes, computer);

    expect(computer.output).toStrictEqual([237]);
  });

  it('outputs the value at the given memory location in position mode', () => {
    let outputOpcode = OPCODES[4];

    let args = [0];
    let modes = [0];
    let computer = {memory: [42], output: []};

    outputOpcode.operation(args, modes, computer);

    expect(computer.output).toStrictEqual([42]);
    expect(computer.memory[0]).toBe(42);
  });
});

describe('Opcode 5: jump-if-true', () => {
  it('sets the instruction pointer to param 2 if param 1 is non-zero (immediate)', () => {
    let jumpIfTrueOpcode = OPCODES[5];

    let args = [1, 23];
    let modes = [1, 1];
    let computer = {memory: [], pc: 0};

    jumpIfTrueOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(23);
  });

  it('sets the instruction pointer to param 2 if param 1 is non-zero (position)', () => {
    let jumpIfTrueOpcode = OPCODES[5];

    let args = [1, 2];
    let modes = [0, 0];
    let computer = {memory: [0, 1, 42], pc: 0};

    jumpIfTrueOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(42);
  });

  it('does not change the IP if param 1 is zero (immediate)', () => {
    let jumpIfTrueOpcode = OPCODES[5];

    let args = [0, 23];
    let modes = [1, 1];
    let computer = {memory: [], pc: 0};

    jumpIfTrueOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(0);
  });

  it('does not change the IP if param 1 is zero (position)', () => {
    let jumpIfTrueOpcode = OPCODES[5];

    let args = [0, 1];
    let modes = [0, 0];
    let computer = {memory: [0, 23], pc: 0};

    jumpIfTrueOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(0);
  });
});

describe('Opcode 6: jump-if-false', () => {
  it('sets the instruction pointer to param 2 if param 1 is zero (immediate)', () => {
    let jumpIfFalseOpcode = OPCODES[6];

    let args = [0, 23];
    let modes = [1, 1];
    let computer = {memory: [], pc: 0};

    jumpIfFalseOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(23);
  });

  it('sets the instruction pointer to param 2 if param 1 is zero (position)', () => {
    let jumpIfFalseOpcode = OPCODES[6];

    let args = [1, 2];
    let modes = [0, 0];
    let computer = {memory: [0, 0, 42], pc: 0};

    jumpIfFalseOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(42);
  });

  it('does not change the IP if param 1 is not zero (immediate)', () => {
    let jumpIfFalseOpcode = OPCODES[6];

    let args = [2, 23];
    let modes = [1, 1];
    let computer = {memory: [], pc: 0};

    jumpIfFalseOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(0);
  });

  it('does not change the IP if param 1 is zero (position)', () => {
    let jumpIfFalseOpcode = OPCODES[6];

    let args = [0, 1];
    let modes = [0, 0];
    let computer = {memory: [1, 23], pc: 0};

    jumpIfFalseOpcode.operation(args, modes, computer);

    expect(computer.pc).toBe(0);
  });
});

describe('Opcode 7: less-than', () => {
  it('writes 1 to the given position if a < b (immediate)', () => {
    let lessThanOpcode = OPCODES[7];

    let args = [2, 21, 1];
    let modes = [1, 1, 0]
    let computer = {memory: []};

    lessThanOpcode.operation(args, modes, computer);

    expect(computer.memory[1]).toBe(1);
  });

  it('writes 1 to the given position if a < b (position)', () => {
    let lessThanOpcode = OPCODES[7];

    let args = [0, 2, 1];
    let modes = [0, 0, 0]
    let computer = {memory: [1, 2, 3]};

    lessThanOpcode.operation(args, modes, computer);

    expect(computer.memory[1]).toBe(1);
  });

  it('writes 0 to the given position if a >= b (immediate)', () => {
    let lessThanOpcode = OPCODES[7];

    let args = [21, 2, 1];
    let modes = [1, 1, 0]
    let computer = {memory: []};

    lessThanOpcode.operation(args, modes, computer);

    expect(computer.memory[1]).toBe(0);
  });

  it('writes 0 to the given position if a >= b (position)', () => {
    let lessThanOpcode = OPCODES[7];

    let args = [0, 2, 1];
    let modes = [0, 0, 0]
    let computer = {memory: [3, 2, 1]};

    lessThanOpcode.operation(args, modes, computer);

    expect(computer.memory[1]).toBe(0);
  });
});

describe('Opcode 8: equals', () => {
  it('writes 1 to the given position if a === b (immediate)', () => {
    let equalsOpcode = OPCODES[8];

    let args = [2, 2, 0];
    let modes = [1, 1, 0];
    let computer = {memory: []};

    equalsOpcode.operation(args, modes, computer);

    expect(computer.memory[0]).toBe(1);
  });

  it('writes 1 to the given position if a === b (position)', () => {
    let equalsOpcode = OPCODES[8];

    let args = [0, 2, 0];
    let modes = [0, 0, 0];
    let computer = {memory: [1, 2, 1]};

    equalsOpcode.operation(args, modes, computer);

    expect(computer.memory[0]).toBe(1);
  });

  it('writes 0 to the given position if a != b (immediate)', () => {
    let equalsOpcode = OPCODES[8];

    let args = [21, 2, 0];
    let modes = [1, 1, 0];
    let computer = {memory: []};

    equalsOpcode.operation(args, modes, computer);

    expect(computer.memory[0]).toBe(0);
  });

  it('writes 0 to the given position if a != b (position)', () => {
    let equalsOpcode = OPCODES[8];

    let args = [0, 2, 0];
    let modes = [0, 0, 0];
    let computer = {memory: [3, 2, 1]};

    equalsOpcode.operation(args, modes, computer);

    expect(computer.memory[0]).toBe(0);
  });
});

describe("Opcode 99: halt", () => {
  it("sets the computer's halted property to true", () => {
    let haltOpcode = OPCODES[99];
    let modes = [];
    let computer = { memory: [], halted: false}

    haltOpcode.operation([], [], computer);

    expect(computer.halted);
  })
});