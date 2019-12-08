const { Range } = require('../utils/mathyUtils');

function checkPassword(password, range){
    return hasSixDigits(password) 
           && range.contains(password)
           && checkForAdjacentIdenticalDigits(password)
           && checkThatDigitsDoNotDecrease(password);
}

function checkPassword2(password, range){
    return hasSixDigits(password) 
           && range.contains(password)
           && checkForAdjacentIdenticalDigits(password)
           && checkThatDigitsDoNotDecrease(password)
           && checkForAdjacentIdenticalDigitsButLikeNotTooMany(password);
}

function hasSixDigits(number){
    return String(number).length === 6
}

function checkForAdjacentIdenticalDigits(password) {
    let passwordStr = String(password);

    let found = false;
    for(let i = 0; i < passwordStr.length; i++){
        if(passwordStr[i] === passwordStr[i + 1]){
            found = true;
            break;
        }
    }

    return found;
}

function checkThatDigitsDoNotDecrease(password) {
    let passwordStr = String(password);

    let noDecreasingDigits = true;
    for(let i = 0; i < passwordStr.length; i++){
        if(Number(passwordStr[i]) > Number(passwordStr[i + 1])){
            noDecreasingDigits = false; 
            break;
        }
    }

    return noDecreasingDigits;
}

function checkForAdjacentIdenticalDigitsButLikeNotTooMany(password) {
    let passwordStr = String(password);

    let good = false;

    let workingDigit = passwordStr[0];
    let count = 1;

    for(let i = 1; i < passwordStr.length; i++){
        if(passwordStr[i] === workingDigit){ 
            count++;
        } else { 
            if (count === 2) good = true; 
            count = 1;
            workingDigit = passwordStr[i];
        }
    }

    return good || count == 2;
}

module.exports = { checkPassword, checkPassword2 };