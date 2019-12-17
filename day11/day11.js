const { IntcodeComputer } = require(`${__dirname}/../intcode/intcode`);
// const { Point } = require(`${}`)

const DIRECTIONS = {
    "UP":    new Point(0, 1),
    "DOWN":  new Point(0, -1),
    "LEFT":  new Point(-1, 0),
    "RIGHT": new Point(1,  0),
}

class HullRobot {
    constructor(program){ 
        this.direction = DIRECTIONS.UP;
        
        this.computer = new IntcodeComputer(program);
    }

    step(){

    }

    paintSquare(position, color){

    }
}