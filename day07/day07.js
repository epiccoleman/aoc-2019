const { IntcodeComputer } = require("../intcode/intcode");
const { permutations } = require("../utils/mathyUtils");

class AmpController {
    constructor(program) {
        this.program = program;
    }

    testPhaseSequence(phaseSequence){
        let outputSignal = 0;

        phaseSequence.forEach((phaseSetting) => {
            let computer = new IntcodeComputer(this.program);

            computer.input = [ phaseSetting, outputSignal ];
            computer.execute();

            if( computer.output.length === 0) throw "wtf man";
            outputSignal = computer.output[0];

        });

        return outputSignal;
    }

    testPhaseSequenceFeedbackMode(phaseSequence){
        let memory = this.program.slice();

        let ampA = new IntcodeComputer(memory.slice(), [phaseSequence[0], 0]);
        let ampB = new IntcodeComputer(memory.slice(), [phaseSequence[1]]);
        let ampC = new IntcodeComputer(memory.slice(), [phaseSequence[2]]);
        let ampD = new IntcodeComputer(memory.slice(), [phaseSequence[3]]);
        let ampE = new IntcodeComputer(memory.slice(), [phaseSequence[4]]);

        while(!(ampE.halted)) {
            ampA.receiveInput(ampE.output);
            ampE.output = [];
            ampA.execute();

            ampB.receiveInput(ampA.output);
            ampA.output = [];
            ampB.execute();

            ampC.receiveInput(ampB.output);
            ampB.output = [];
            ampC.execute();

            ampD.receiveInput(ampC.output);
            ampC.output = [];
            ampD.execute();

            ampE.receiveInput(ampD.output);
            ampD.output = [];
            ampE.execute();
        }

        return ampE.output[0];
    }

    testAllPhaseSequences() {
        let phaseSequences = permutations([0, 1, 2, 3, 4]);

        let bestSignal = 0;
        let bestSequence = [];

        phaseSequences.forEach((phaseSequence) => {
            let result = this.testPhaseSequence(phaseSequence);
            if(result > bestSignal){
                bestSignal = result;
                bestSequence = phaseSequence;
            }
        });

        return { bestSignal, bestSequence };
    }

    testAllPhaseSequencesFeedbackMode() {
        let phaseSequences = permutations([5, 6, 7, 8, 9]);

        let bestSignal = 0;
        let bestSequence = [];

        phaseSequences.forEach((phaseSequence) => {
            let result = this.testPhaseSequenceFeedbackMode(phaseSequence);
            if(result > bestSignal){
                bestSignal = result;
                bestSequence = phaseSequence;
            }
        });

        return { bestSignal, bestSequence };
    }
}

module.exports = { AmpController };