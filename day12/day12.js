const { Point } = require(`${__dirname}/../utils/mathyUtils`);
const { lcm } = require("mathjs");

// <x=-7, y=17, z=-11>
// <x=9, y=12, z=5>
// <x=-9, y=0, z=-4>
// <x=4, y=6, z=0>

//probably a more math way to do this but whatever
const PAIRS = [ [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]; 

class NBodySimulator {
//Simulate the motion of the moons in time steps. 
    constructor(moons){
        this.moons = moons;
        this.startingState = moons;
        for(const moon of this.moons){
            moon.velocity = new Point();
        }
    }

    findPeriod(){
        //find period for each axis, then get the lcm 
        let periods = { x: 0, y: 0, z: 0 };
        for(let axis in periods){
            let seen = new Set();
            let currentState = this.getAxisState(axis);
            let iteration = 0;
            while(!( seen.has(currentState) )){
                seen.add(currentState);
                this.step();
                currentState = this.getAxisState(axis);
                iteration++;
            }
            periods[axis] = iteration;
        }

        return lcm(...Object.values(periods));
    }

    getAxisState(axis){
        let state = "";
        for(let moon in this.moons){
            state += this.moons[moon].position[axis]
            state += ","
            state += this.moons[moon].velocity[axis]
            state += ","
        }
        return state;
    }

    simulate(steps){
        for(let i = 0; i < steps; i++){
            this.step();
            // console.log(this.totalEnergy());
        }
    }

//Within each time step, first update the velocity of every moon by applying gravity. 
//Then, once all moons' velocities have been updated, update the position of every moon by applying velocity. //
//Time progresses by one step once all of the positions are updated. 
    step(){
        this.applyGravity();
        this.applyVelocity();
    }

    applyGravity(){
        for(const pair of PAIRS) {
            let [ moonIndexA, moonIndexB ] = pair;
            let moonA = this.moons[moonIndexA];
            let moonB = this.moons[moonIndexB];

            for(const axis of ["x", "y", "z"]){
                if(moonA.position[axis] > moonB.position[axis]){
                    moonA.velocity[axis] -= 1;
                    moonB.velocity[axis] += 1;
                } 
                else if (moonA.position[axis] < moonB.position[axis]){
                    moonA.velocity[axis] += 1;
                    moonB.velocity[axis] -= 1;
                } 
            }
        }
    }

    applyVelocity(){
        for(const moon of this.moons){
            moon.position.add(moon.velocity);
        }
    }
    // The total energy for a single moon is its potential energy multiplied by its kinetic energy.
    //  A moon's potential energy is the sum of the absolute values of its x, y, and z position coordinates. 
    // A moon's kinetic energy is the sum of the absolute values of its velocity coordinates.

    totalEnergy(){
        let totalEnergy = 0;
        for(const moon of this.moons){
            totalEnergy += this.potentialEnergy(moon) * this.kineticEnergy(moon);
        }
        return totalEnergy;
    }

    potentialEnergy(moon){
        let energy = 0;
        for(const axis in moon.position){
            energy += Math.abs(moon.position[axis]);
        }
        return energy;
    }

    kineticEnergy(moon){
        let energy = 0;
        for(const axis in moon.velocity){
            energy += Math.abs(moon.velocity[axis]);
        }
        return energy;
    }
}

module.exports = { NBodySimulator }