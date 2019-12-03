const { calculateFuelRequirement, calculateFuelRequirementPart2 } = require("./day01");

describe('calculateFuelRequirement', () => {
 it.each`
 mass | fuel
 ${12} | ${2}
 ${14} | ${2}
 ${1969} | ${654}
 ${100756} | ${33583}
 `('returns fuel requirement $fuel for a mass of $mass',
 ({mass, fuel}) => {
   expect(calculateFuelRequirement(mass)).toBe(fuel);
 });
});

describe('calculateFuelRequirementPart2', () => {
 it.each`
 mass | fuel
 ${14} | ${2}
 ${1969} | ${966}
 ${100756} | ${50346}
 `('returns fuel requirement $fuel for a mass of $mass',
 ({mass, fuel}) => {
   expect(calculateFuelRequirementPart2(mass)).toBe(fuel);
 });
});