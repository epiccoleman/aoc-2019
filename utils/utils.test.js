const {stringListFromInput, numberListFromInput} = require('./utils');

test('stringListFromInput creates a list of strings from its input', () => {
    const list = stringListFromInput("utils/testInput.txt");

    expect(list).toEqual(["1", "2", "3"])
});

test('numberListFromInput creates a list of Numbers from its input', () => {
    const list = numberListFromInput("utils/testInput.txt");

    expect(list).toEqual([1, 2, 3])
});