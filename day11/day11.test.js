const { HullRobot } = require(`${__dirname}/day11`);
const { Point } = require(`${__dirname}/../utils/mathyUtils`);

describe("paint", () => { 
    it("paints the square even if not previously allocated", () => {
        let hullRobot = new HullRobot([]);

        hullRobot.position = new Point(3, 4);
        hullRobot.paint(1);

        expect(hullRobot.board[3][4]).toBe(1);
    });
});