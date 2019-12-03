const readline = require('readline');
const fs = require('fs');

function stringListFromInput(path){
   return fs.readFileSync(path).toString('utf-8').split("\n");
}

function numberListFromInput(path){
   const stringList = stringListFromInput(path);
   return stringList.map(line => Number(line));
}

module.exports = {stringListFromInput, numberListFromInput};