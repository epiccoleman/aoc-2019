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

  it('throws if asked to run a bad opcode', () => {
    let computer = new IntcodeComputer([21347, 0, 99]);
    expect(() => { computer.execute() }).toThrow("Tried to run a non-existent opcode");
  });
});

describe('getInstructionModes', () => {
  it.each`
  instruction | modes
  ${"203"} | ${[2, 0, 0]}
  ${"3"} | ${[0, 0, 0]}
  ${"102"} | ${[1, 0, 0]}
  ${"1002"} | ${[0, 1, 0]}
  ${"20101"} | ${[1, 0, 2]}
  `('returns $modes for $instruction',
  ({instruction, modes}) => {
    expect(IntcodeComputer.getInstructionModes(instruction)).toStrictEqual(modes);
  });
 });
  
describe('getMemory', () => {
  //0
  it('returns the value at the given position in position mode', () => {
    let computer = new IntcodeComputer([3, 0, 99]);
    let arg = 2; 
    let mode = 0;

    expect(computer.getMemory(arg, mode)).toBe(99);
  });

  //1
  it('returns the value itself in immediate mode', () => {
    let computer = new IntcodeComputer([3, 0, 99]);
    let arg = 2; 
    let mode = 1;

    expect(computer.getMemory(arg, mode)).toBe(2);
  });

  //
  it('returns the value at the given position adjusted by the relative base in relative mod', () => {
    let computer = new IntcodeComputer([3, 0, 99]);
    let arg = 2; 
    let mode = 2;
    computer.relativeBase = -2;
    
    expect(computer.getMemory(arg, mode)).toBe(3);
  });
  
});

// describe('setMemory', () => {
//   it('sets the value at the given position in position mode', () => {
    
//   });
 
//   it('throws if called with immediate mode', () => {

//   });

//   it('sets the value at the given position adjusted by the relative base in relative mode')

// })