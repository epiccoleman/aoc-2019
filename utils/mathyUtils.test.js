const { Range, Point } = require('./mathyUtils');

describe('Point', () => {
    it('is constructed with x and y', () => {
        let point = new Point(21, 12);
        expect(point.x).toBe(21);
        expect(point.y).toBe(12);
    });

    it('defaults to [0, 0]', () => {
        let point = new Point();
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
    });
});

describe('Range', () => {
    it('is constructed with a start and end', () => {
        let interval = new Range(10, 12);
        expect(interval.start).toBe(10);
        expect(interval.end).toBe(12);
    });

    it('defaults to [0, 0]', () => {
        let interval = new Range();
        expect(interval.start).toBe(0);
        expect(interval.end).toBe(0);
    });

    it('orders the ends of the range', () => { 
        let interval = new Range(42, -10);
        expect(interval.start).toBe(-10);
        expect(interval.end).toBe(42);
        
    });

    it.each`
    number | inRange
    ${9}  | ${false}
    ${10} | ${true}
    ${11} | ${true}
    ${12} | ${true}
    ${13} | ${false}
    `('can check if a number is inside the given range',
    ({number, inRange}) => {
      expect(new Range(10, 12).contains(number)).toBe(inRange);
    });
});