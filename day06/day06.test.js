const { countOrbits, countStepsToDestination, OrbitGraph } = require("./day06");

describe("OrbitGraph", () => {
  it("correctly determines its root node", () => {
    let testInput = [
      "COM)B", "B)C", "C)D"
    ];

    let orbitGraph = new OrbitGraph(testInput);

    expect(orbitGraph.root).toBe("COM");
  });

  it.each`
  node | stepsToRoot
  ${"D"} | ${3}
  ${"C"} | ${2}
  ${"B"} | ${1}
  ${"COM"} | ${0}
  `('counts $stepsToRoot steps from $node to root',
  ({node, stepsToRoot}) => {
    let testInput = [
      "COM)B", "B)C", "C)D"
    ];
    let orbitGraph = new OrbitGraph(testInput);

    expect(orbitGraph.countStepsToRoot(node)).toBe(stepsToRoot);
  });

  describe("countOrbits", () => {
    it("correctly counts orbits on a simple input", () => {
      let testInput = [
        "COM)B", "B)C", "C)D"
      ];
      //d indirectly orbits B and COM and directly orbits C (3)
      //c indirectly orbits COM and directly orbits B (2)
      //b directly orbits COM (1)

      let orbitGraph = new OrbitGraph(testInput);

      expect(orbitGraph.countOrbits()).toBe(6);
    });
  
    it("correctly counts orbits on the test input", () => {
      let testInput = [
        "COM)B", "B)C", "C)D", "D)E", "E)F", "B)G",
        "G)H", "D)I", "E)J", "J)K", "K)L" 
      ];
  
      let orbitGraph = new OrbitGraph(testInput);

      expect(orbitGraph.countOrbits()).toBe(42);
    });
  });
});

