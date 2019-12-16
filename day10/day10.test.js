const { enumerateAsteroids, countVisibleAsteroids, vaporizeAsteroids } = require(`${__dirname}/day10`);
const { stringListFromInput } = require(`${__dirname}/../utils/utils`);

it('enumerateAsteroids returns a list of all asteroids in the input', () => {
    //
    //   .#..#
    //   .....
    //   ##...
    //   ....#
    //   ...##

    let input = [".#..#", ".....", "##...", "....#", "...##"];
    let expected = [[1,0], [4,0], [0,2], [1,2], [4,3], [3,4], [4,4]];

    expect(enumerateAsteroids(input)).toStrictEqual(expected);
});

describe('countVisibleAsteroids counts visible asteroids from a given location', () => {
    it.each`
    input | position | count
    ${`${__dirname}/testInput1.txt`} | ${[5,8]}   | ${33}
    ${`${__dirname}/testInput2.txt`} | ${[1,2]}   | ${35}
    ${`${__dirname}/testInput3.txt`} | ${[6,3]}   | ${41}
    ${`${__dirname}/testInput4.txt`} | ${[11,13]} | ${210}
    `('returns correct count for the given asteroid field',
    ({input, position, count}) => {
        let asteroids = enumerateAsteroids(stringListFromInput(input));
    
        expect(countVisibleAsteroids(position, asteroids)).toEqual(count);
    });
});

it('vaporizeAsteroid returns the correct asteroid', () => {
    let asteroids = enumerateAsteroids(stringListFromInput(`${__dirname}/testInput4.txt`));

    expect(vaporizeAsteroids([11, 13], asteroids)[0].asteroid.original).toStrictEqual([11,12]);
    expect(vaporizeAsteroids([11, 13], asteroids)[1].asteroid.original).toStrictEqual([12, 1]);
    expect(vaporizeAsteroids([11, 13], asteroids)[2].asteroid.original).toStrictEqual([12, 2]);
})

it('vaporizeAsteroid returns the correct asteroid', () => {
    let asteroids = enumerateAsteroids(stringListFromInput(`${__dirname}/testInput5.txt`));

    expect(vaporizeAsteroids([8, 3], asteroids)[0].asteroid.original).toStrictEqual([8,1]);
})