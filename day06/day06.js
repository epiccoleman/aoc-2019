var Graph = require("graphlib").Graph;

class OrbitGraph {
    constructor(input){
        this.graph = new Graph();

        input.forEach((edgeStr) => {
            let edge = edgeStr.split(")");
            this.graph.setEdge(edge[0], edge[1]);
        });

        this.root = this.findRoot();
    }

    findRoot() {
        let root = ""
        this.graph.nodes().forEach((node) => {
            if(this.graph.predecessors(node).length === 0) root = node;
        });
        return root;
    }

    countStepsToRoot(node, acc = 0){
        if(node == this.root) return 0;
    
        let parent = this.graph.predecessors(node)[0];
        if(parent === this.root){
            return acc + 1;
        } else {
            acc += 1;
            return this.countStepsToRoot(parent, acc);
        }
    }
    
    countOrbits(){
        let orbitCount = 0;
        this.graph.nodes().forEach((node) => {
            orbitCount += this.countStepsToRoot(node);
        });
        return orbitCount;
    }
}

module.exports = { OrbitGraph };