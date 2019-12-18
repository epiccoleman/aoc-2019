const { IntcodeComputer } = require(`${__dirname}/../intcode/intcode`);
const { Point } = require(`${__dirname}/../utils/mathyUtils`);



const DIRECTIONS = {
    "UP":    new Point(0, 1),
    "RIGHT": new Point(1,  0),
    "DOWN":  new Point(0, -1),
    "LEFT":  new Point(-1, 0),
}

class HullRobot {
    constructor(program){ 
        this.direction = "UP";
        this.position = new Point();
        this.computer = new IntcodeComputer(program);
        this.board = {};
    }

    getBoardRange() { 
        let xs = [];
        let ys = [];
        for(const panel of Object.keys(this.board)){
            let [x, y] = panel.split(",");
            xs.push(x);
            ys.push(y);
        }
        let xMin = Math.min(...xs);
        let xMax = Math.max(...xs);
        let yMin = Math.min(...ys);
        let yMax = Math.max(...ys);

        console.log(`x: ${xMin} to ${xMax}`)
        console.log(`y: ${yMin} to ${yMax}`)
        // x: 0 to 42
        // y: -5 to 0
    }

    printBoard() {
        let print = {
        }
        for(const panel in this.board){
            let [x, y] = panel.split(",").map(Number);
            // y += 5;  //because of negatives in the y indices, this is hardcoded 
            if (!(y in print)) print[y] = [];
            print[y][x] = this.board[panel] ? "#" : ".";
        }
        for(let row in print){
            // console.log("hey")
            console.log(print[row].join(""));
        }
    }

    getIdentifier() { 
        this.paint(1);
        while(!this.computer.halted){
            this.step();
        }
    }

    countVisitedSquares(){
        while(!this.computer.halted ){
            this.step();
        }
        return Object.keys(this.board).length;
    }

    step(){
        let currentColor = this.readCamera();
        // console.log(`At position ${this.position.x}, ${this.position.y} facing ${this.direction}, read color ${currentColor}`);
        this.computer.receiveInput([currentColor]);
        // console.log(`Computer input = ${this.computer.input}`)
        this.computer.execute();
        // console.log("Computer awaiting further input, time to paint");
        if(!this.computer.halted) {
            // console.log(`Computer output = ${this.computer.output}`)
            let [ color, turnDirection ] = this.computer.output
            // console.log(`Painting ${color ? 'white' : 'black'}, turning ${turnDirection ? 'right' : 'left'}`);
            this.computer.flushOutput();

            this.paint(color);
            this.turnRobot(turnDirection);
            this.position.add(DIRECTIONS[this.direction]);
            // console.log(`New direction ${this.direction}, new position ${this.position.x}, ${this.position.y}`)
        }
    }

    //returns color at current position
    readCamera(){
        return this.board[this.position.toString()] || 0;
    }

    paint(color){
        this.board[this.position.toString()] = color;
    }

    turnRobot(direction) {
        if (direction) {
            this.turnRight();
        } else { 
            this.turnLeft();
        }
    }

    turnRight() {
        switch (this.direction) {
            case "UP": 
                this.direction = "RIGHT";
                break; 
            case "RIGHT": 
                this.direction = "DOWN";
                break; 
            case "DOWN": 
                this.direction = "LEFT";
                break; 
            case "LEFT": 
                this.direction = "UP";
                break; 
        }
    }

    turnLeft() {
        switch (this.direction) {
            case "UP": 
                this.direction = "LEFT";
                break; 
            case "LEFT": 
                this.direction = "DOWN";
                break; 
            case "DOWN": 
                this.direction = "RIGHT";
                break; 
            case "RIGHT": 
                this.direction = "UP";
                break; 
        }
    }
} 

module.exports = { HullRobot }