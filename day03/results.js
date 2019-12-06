const { getWireIntersections, getWireSegments, countStepsToPoint } = require("./day03");
const { Point, manhattanDistance } = require("../utils/mathyUtils");
const { stringListFromInput } = require("../utils/utils");

function result1() {
    const input = stringListFromInput("./input.txt");
    const wire1Turns = input[0].split(',');
    const wire2Turns = input[1].split(',');

    const wire1 = getWireSegments(wire1Turns);
    const wire2 = getWireSegments(wire2Turns);

    const intersections = getWireIntersections(wire1, wire2);

    let minimumDistance = 1000000;
    let centralPortLocation = new Point(0,0);

    intersections.forEach((intersection) => {
        let distance = manhattanDistance(intersection, centralPortLocation);
        if(distance < minimumDistance){
            minimumDistance = distance;
        }
    });

    return minimumDistance;
}

function result2() {
    const input = stringListFromInput("./input.txt");
    const wire1Turns = input[0].split(',');
    const wire2Turns = input[1].split(',');

    const wire1 = getWireSegments(wire1Turns);
    const wire2 = getWireSegments(wire2Turns);

    const intersections = getWireIntersections(wire1, wire2);

    let minimumDistance = 10000000000;
    let centralPortLocation = new Point(0,0);

    intersections.forEach((intersection) => {
        let distance = countStepsToPoint(wire1, intersection) + countStepsToPoint(wire2, intersection);
        if(distance < minimumDistance){
            minimumDistance = distance;
        }
    });

    return minimumDistance;
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 1:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();