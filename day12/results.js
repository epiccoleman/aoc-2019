const { NBodySimulator } = require(`${__dirname}/day12`);
const { Point } = require(`${__dirname}/../utils/mathyUtils`)

// <x=-7, y=17, z=-11>
// <x=9, y=12, z=5>
// <x=-9, y=0, z=-4>
// <x=4, y=6, z=0>


function result1() {
    //not gonna bother parsing this, only 4
    const moons = [
        { position: new Point(-7, 17, -11) },
        { position: new Point(9, 12, 5) },
        { position: new Point(-9, 0, -4) },
        { position: new Point(4, 6, 0) },
    ]

    simulator = new NBodySimulator(moons);
    simulator.simulate(1000);
    return simulator.totalEnergy();
}

function result2() {
    const moons = [
        { position: new Point(-7, 17, -11) },
        { position: new Point(9, 12, 5) },
        { position: new Point(-9, 0, -4) },
        { position: new Point(4, 6, 0) },
    ]

    simulator = new NBodySimulator(moons);
    return simulator.findPeriod();
}

function main(){
    console.log("=====================================================");
    console.log("Results for Day 12:");
    console.log(`Part 1: ${result1()}`)
    console.log(`Part 2: ${result2()}`)
}

main();