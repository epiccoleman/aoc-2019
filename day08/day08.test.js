const { partition, countChar } = require("./day08");

it("partitions an array into chunks", () =>  {
    let input = [ 1, 2, 3, 4, 
                  5, 6, 7, 8, 
                  9,10,11,12 ];
    
    let expected = [ [ 1, 2, 3, 4 ],
                     [ 5, 6, 7, 8 ], 
                     [ 9,10,11,12 ] ];

    let result = partition(input, 4);

    expect(result).toStrictEqual(expected);
});

it("counts the occurrences of a given character in the input", () => {
   let input = [ "2", "1", "1", "2", "1", "9", "7", "6" ];

   expect(countChar(input, "2")).toBe(2);
   expect(countChar(input, "1")).toBe(3);
});
