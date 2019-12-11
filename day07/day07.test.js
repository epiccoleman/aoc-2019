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

  })
});

