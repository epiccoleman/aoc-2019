const { checkPassword, checkPassword2 } = require("./day04");
const { Range } = require("../utils/mathyUtils");

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

 it.each`
 password | valid
 ${111111} | ${true}
 ${300000} | ${false}
 ${100000} | ${false}
 `('is within the given range',
 ({password, valid}) => {
   expect(checkPassword(password, new Range(100001, 200000))).toBe(valid);
 });

 it.each`
 password | valid
 ${111111} | ${true}
 ${112345} | ${true}
 ${123789} | ${false}
 `('has at least one set of identical adjacent digits',
 ({password, valid}) => {
   expect(checkPassword(password, new Range(100001, 200000))).toBe(valid);
 });

 it.each`
 password | valid
 ${111111} | ${true}
 ${112345} | ${true}
 ${113430} | ${false}
 `('digits never decrease from left to right',
 ({password, valid}) => {
   expect(checkPassword(password, new Range(100001, 200000))).toBe(valid);
 });
});

it.each`
password | valid
${111122} | ${true}
${123444} | ${false}
${112233} | ${true}
`('checkPassword2',
({password, valid}) => {
  expect(checkPassword2(password, new Range(100001, 200000))).toBe(valid);
});