function calculateFuelRequirement(mass){
   return Math.floor(mass / 3) - 2;
}

function calculateFuelRequirementPart2(mass){
    const fuelRequirement = calculateFuelRequirement(mass);

    if(fuelRequirement > 0){
        return fuelRequirement + calculateFuelRequirementPart2(fuelRequirement) ;
    } else {
        return 0;
    }
}

module.exports = { calculateFuelRequirement, calculateFuelRequirementPart2 };