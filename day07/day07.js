const { IntcodeComputer } = require("../intcode/intcode");
const { permutations } = require("../utils/mathyUtils");

class AmpController {
    constructor(program) {
        this.program = program;
        // this.input = [];
        // this.output = [];
        this.computer = new IntcodeComputer(this.program, this.input, this.output);
    }

    resetComputer(){
        this.computer.memory = this.program;
        this.computer.input = [];
        this.computer.output = [];
    }

    testPhaseSequence(phaseSequence){
        // let inputSignal = 0;
        let outputSignal = 0;

        phaseSequence.forEach((phaseSetting) => {
            this.resetComputer();
            this.computer.input = [ phaseSetting, outputSignal ];
            this.computer.execute();

            if( this.computer.output.length === 0) throw "wtf man";
            outputSignal = this.computer.output[0];

        });

        return outputSignal;
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
}

module.exports = { AmpController };