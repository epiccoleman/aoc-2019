const { AmpController } = require("./day07");

describe("AmpController", () => {
  it("returns the correct result for a single phase sequence", () => {
    let program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
    let phaseSequence = [ 4,3,2,1,0 ];

    let ampController = new AmpController(program);

    let expectedSignal = 43210;

    expect(ampController.testPhaseSequence(phaseSequence)).toBe(expectedSignal);
  });

  it("returns the correct value when it tests all phase sequences for a given program", () => {
    let program = [3,23,3,24,1002,24,10,24,1002,23,-1,23,
      101,5,23,23,1,24,23,23,4,23,99,0,0];

    let ampController = new AmpController(program);
    
    let expectedSignal = 54321;
    let expectedSequence = [ 0, 1, 2, 3, 4 ];
    
    let result = ampController.testAllPhaseSequences();

    expect(result.bestSignal).toBe(expectedSignal);
    expect(result.bestSequence).toStrictEqual(expectedSequence);
  });

  it("correctly tests a single phase sequence in feedback mode", () => {
    let program = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
      27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
    let phaseSequence = [ 9,8,7,6,5 ];

    let ampController = new AmpController(program);
    
    let expectedSignal = 139629729;
    expect(ampController.testPhaseSequenceFeedbackMode(phaseSequence)).toBe(expectedSignal);
  });

  it("returns the correct value when it tests all phase sequences in feedback mode for a given program", () => {
    let program = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
      -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
      53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];

    let ampController = new AmpController(program);
    
    let expectedSignal = 18216;
    let expectedSequence = [ 9,7,8,5,6];
    
    let result = ampController.testAllPhaseSequencesFeedbackMode();

    expect(result.bestSignal).toBe(expectedSignal);
    expect(result.bestSequence).toStrictEqual(expectedSequence);
  });
});

