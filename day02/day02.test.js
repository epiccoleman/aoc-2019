const { executeIntcode } = require("./day02");

describe('executeIntcode', () => {
 it.each`
 input | result
 ${[1,0,0,0,99]} | ${[2,0,0,0,99]}
 ${[2,3,0,3,99]} | ${[2,3,0,6,99]}
 ${[2,4,4,5,99,0]} | ${[2,4,4,5,99,9801]}
 ${[1,1,1,4,99,5,6,0,99]} | ${[30,1,1,4,2,5,6,0,99]}
 `('returns correct result for the given intcode',
 ({input, result}) => {
   expect(executeIntcode(input)).toEqual(result);
 });
});