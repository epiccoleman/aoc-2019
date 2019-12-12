const { IntcodeComputer } = require("./intcode");

describe('execute', () => {
  it('executes a single instruction correctly', () => {
    let computer = new IntcodeComputer([1002,4,3,4,33]);
    let returnCode = computer.execute();

    expect(computer.pc).toBe(4);
    expect(returnCode).toBe(0);
    expect(computer.memory).toStrictEqual([1002,4,3,4,99]);
    expect(computer.halted);
  });

  it('executes legacy intcode correctly', () => { 
    let computer = new IntcodeComputer([1,1,1,4,99,5,6,0,99]);
    let returnCode = computer.execute();

    expect(computer.pc).toBe(8);
    expect(returnCode).toBe(0);
    expect(computer.memory).toStrictEqual([30,1,1,4,2,5,6,0,99]);
    expect(computer.halted);
  });

  it('pauses if it reaches an input with nothing in the input queue, and can be restarted', () => {
    let computer = new IntcodeComputer([3, 0, 99]);
    computer.execute();
    expect(computer.paused).toBe(true);
    expect(computer.pc).toBe(0);

    computer.receiveInput([123]);
    computer.execute();

    expect(computer.pc).toBe(2);
    expect(computer.memory).toStrictEqual([123, 0, 99]);
    expect(computer.halted);
  });
});