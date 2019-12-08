const {} = require("./intcode");

describe('checkPassword', () => {
 it.each`
 password | valid
 ${111111} | ${true}
 ${1111111} | ${false}
 ${11111} | ${false}
 `('has six digits',
 ({password, valid}) => {
   expect(checkPassword(password, new Range(100001, 200000))).toBe(valid);
 });
});
