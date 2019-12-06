const { Point, manhattanDistance, checkLineIntersection } = require("../utils/mathyUtils");

class WireSegment { 
    constructor(wireCode, start){
        this.direction = wireCode[0];
        this.magnitude = Number(wireCode.slice(1));

        this.start = new Point(start.x, start.y);

        this.end = new Point();
        switch (this.direction) {
            case "L":
                this.end.x = this.start.x - this.magnitude;
                this.end.y = this.start.y;
                break;
            case "R":
                this.end.x = this.start.x + this.magnitude;
                this.end.y = this.start.y;
                break;
            case "U":
                this.end.y = this.start.y + this.magnitude;
                this.end.x = this.start.x;
                break;
            case "D":
                this.end.y = this.start.y - this.magnitude;
                this.end.x = this.start.x;
                break;
            default: 
                throw "wtf man"
        }
    }

    intersection(wireSegment) {
        let intersect = checkLineIntersection(this.start.x, this.start.y, this.end.x, this.end.y, 
                              wireSegment.start.x, wireSegment.start.y, wireSegment.end.x, wireSegment.end.y);

        if (!(intersect.onLine1 && intersect.onLine2)) {
            return new Point(0,0);
        } else {
            return new Point(intersect.x, intersect.y);
        }
    }

    pointOnSegment(point){
        switch(this.direction) {
            case "L":
                return (point.y === this.start.y) && (this.end.x <= point.x) && (point.x <= this.start.x);
                break;
            case "R":
                return (point.y === this.start.y) && (this.start.x <= point.x) && (point.x <= this.end.x);
                break;
            case "U":
                return (point.x === this.start.x) && (this.start.y <= point.y) && (point.y <= this.end.y);
                break;
            case "D":
                return (point.x === this.start.x) && (this.end.y <= point.y) &&  (point.y <= this.start.y);
                break;
            default: 
                throw "wtf man"
        }
    }
}

function getWireSegments(wireTurns){
    let segments = [];
    let cursor = new Point(0, 0);
    wireTurns.forEach(turn => {
       let segment = new WireSegment(turn, cursor);
       cursor = { ...segment.end };
       segments.push(segment);
    });
    
    return segments;
}

function getWireIntersections(wire1, wire2){
    let intersections = [];
    wire1.forEach((segment1) => {
        wire2.forEach((segment2) => {
            let result = segment1.intersection(segment2);
            if (!(result.x == 0 && result.y == 0)) intersections.push(result);
        })
    });
    return intersections;
}

function countStepsToPoint(wire, point){
    let stepCount = 0;
    wire.forEach((segment) => {
        if(segment.pointOnSegment(point)){
            stepCount += manhattanDistance(segment.start, point);
        } else {
            stepCount += segment.magnitude;
        }
    });
    return stepCount;
}


module.exports = { Point, WireSegment, getWireSegments, getWireIntersections, countStepsToPoint };