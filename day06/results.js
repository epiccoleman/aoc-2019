const { OrbitGraph } = require("./day06");
const { stringListFromInput } = require("../utils/utils");
const Graph = require("graphlib").Graph;
const dijkstra = require("graphlib").alg.dijkstra;

function result1() {
    let input = stringListFromInput("./input.txt");
    let orbitGraph = new OrbitGraph(input);

    return orbitGraph.countOrbits();
}

function result2() {
    //basically, same as before, but i need to use an undirected graph and i'm not refactoring all that stuff
    let input = stringListFromInput("./input.txt");
    let orbitGraph = new Graph({directed: false});

    input.forEach((edgeStr) => {
        let edge = edgeStr.split(")");
        orbitGraph.setEdge(edge[0], edge[1]);
    });
    
    let youParent = orbitGraph.predecessors("YOU")[0];
    let santaParent = orbitGraph.predecessors("SAN")[0];

    // https://github.com/dagrejs/graphlib/issues/42
    let distanceMap = dijkstra(orbitGraph, youParent, null, function(v) { return orbitGraph.nodeEdges(v) });

    return distanceMap[santaParent].distance;
    
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 6:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();