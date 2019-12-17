class Point {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    add({ x, y }){
        this.x += x;
        this.y += y;
    }
}

class Range {
    constructor(start = 0, end = 0){
        this.start = Math.min(start, end);
        this.end = Math.max(start, end);
    }

    contains(n) {
        return (this.start <= n) && (n <= this.end);
    }
}

function manhattanDistance(pointA, pointB){
    let xDist = Math.abs(pointA.x - pointB.x);
    let yDist = Math.abs(pointA.y - pointB.y);
    return xDist + yDist;
}

// thanks md2perpe
function permutations(list)
{
	// Empty list has one permutation
	if (list.length == 0)
		return [[]];
		
	var result = [];
	
	for (var i=0; i<list.length; i++)
	{
		// Clone list (kind of)
		var copy = Object.create(list);
		// Cut one element from list
		var head = copy.splice(i, 1);
		// Permute rest of list
		var rest = permutations(copy);
		// Add head to each permutation of rest of list
		for (var j=0; j<rest.length; j++)
		{
			var next = head.concat(rest[j]);
			result.push(next);
		}
	}
	return result;
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

module.exports = { Point, manhattanDistance, checkLineIntersection, Range, permutations };