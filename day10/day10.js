const ASTEROID="#";

function enumerateAsteroids(input){
    let asteroids = [];

    for(let y = 0; y < input.length; y++){
        for(let x = 0; x < input[0].length; x++){
            if(input[y][x] === ASTEROID) asteroids.push([x, y]);
        }
    }

    return asteroids;
}

function countVisibleAsteroids(position, asteroids){
    //calculate atan2 to each asteroid and check if their angle is the same

    // since atan2 gets an angle from the origin, adjust each asteroid as if position were 0,0
    let adjustedAsteroids = asteroids.map((asteroid) => (adjustPoint(position, asteroid)));
    let angles = adjustedAsteroids.map((asteroid) => {
        let [x, y] = asteroid;
        return Math.atan2(y, x);
    });
    let uniqueAngles = new Set(angles);
    return uniqueAngles.size;
}

function vaporizeAsteroids(position, asteroids){
    let adjustedAsteroids = asteroids.filter((asteroid) => (!(asteroid[0] == position[0] && asteroid[1] == position[1]))); // take out self
    adjustedAsteroids = adjustedAsteroids.map((asteroid) => ({ adjusted: adjustPoint(position, asteroid), original: asteroid }));
    let asteroidCount = adjustedAsteroids.length;
    // console.log(`asteroidCount: ${asteroidCount}`);
    // let angles = adjustedAsteroids.map((asteroid) => {
    //     let [x, y] = asteroid;
    //     // swapping y and x in this call starts you at positive y axis going clockwise because math
    //     return Math.atan2(x, y);
    // });

    let asteroidMap = {}
    for(asteroid of adjustedAsteroids){
        let [x, y] = asteroid.adjusted;
        // let angle = Math.atan2(x, y);
        let angle = (Math.round(Math.atan2(x, y) * 10000) / 10000);
        angle = angle < 0 ? angle + Math.PI * 2 : angle;
        // console.log(`adjusted: ${asteroid.adjusted[0]}, ${asteroid.adjusted[1]}`)
        // console.log(`original: ${asteroid.original[0]}, ${asteroid.original[1]}`)
        // console.log(angle)
        let distance = Math.hypot(x, y);
        let entry = { asteroid, distance }
        if(angle in asteroidMap){
            asteroidMap[angle].push(entry);
        } else { 
            asteroidMap[angle] = [entry];
        }
    }

    for(let angle in asteroidMap){
        asteroidMap[angle].sort((a, b) => a.distance - b.distance);
    }

    // console.log(asteroidMap);
    let angles = Object.keys(asteroidMap).sort((a, b) => a - b); // should come back sorted? 
    console.log(angles);
    // let partition = angles.findIndex((n) => n >= 0);
    // console.log(angles.length);
    // angles = [ ...angles.slice(partition), ...angles.slice(0, partition) ];
    // console.log(angles);

    let destroidAstroids = []
    // console.log(`Expect this many iterations: ${asteroidCount} over ${angles.length} angles`);
    // for(let i = 0; i < asteroidCount ; i++){
    let angle = 0;
    // while(destroidAstroids.length < asteroidMapCount - 1);
        
        

    //     // console.log(`iteration ${i} using angle ${angle}`);
    //     // console.log(asteroidMap[angle])

    //     destroyed = asteroidMap[angle].shift()
    //     // console.log(destroyed);
    //     destroidAstroids.push(destroyed);
    //     // console.log(asteroidMap[angle])
    //     angle += .00001;
    // }

    return destroidAstroids;
}

function adjustPoint([x_o, y_o], [x, y]){
    return [ x - x_o, y - y_o];
}

module.exports = {enumerateAsteroids, countVisibleAsteroids, vaporizeAsteroids}