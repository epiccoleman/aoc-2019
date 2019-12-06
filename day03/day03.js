class Point {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

class WireSegment { 
    constructor(wireCode, start){
        const direction = wireCode[0];
        const mag = Number(wireCode.slice(1));

        this.start = new Point(start.x, start.y);
        this.direction = direction;

        this.end = new Point();
        switch (direction) {
            case "L":
                this.end.x = this.start.x - mag;
                this.end.y = this.start.y;
                break;
            case "R":
                this.end.x = this.start.x + mag;
                this.end.y = this.start.y;
                break;
            case "U":
                this.end.y = this.start.y + mag;
                this.end.x = this.start.x;
                break;
            case "D":
                this.end.y = this.start.y - mag;
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

// thanks justin c rounds
// http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};


module.exports = { Point, WireSegment, getWireSegments, getWireIntersections };