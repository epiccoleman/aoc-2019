const { WireSegment, getWireSegments, getWireIntersections, countStepsToPoint } = require("./day03");
const { Point } = require("../utils/mathyUtils");

describe('wire segment construction', () => {
  it.each`
  wirecode | expected_endpoint
  ${"L10"} | ${new Point(-10, 0)}
  ${"R10"} | ${new Point(10, 0)}
  ${"U10"} | ${new Point(0, 10)}
  ${"D10"} | ${new Point(0, -10)}
  `('calculates the endpoint correctly ',
  ({wirecode, expected_endpoint}) => {
    let startPoint = {x: 0, y: 0};
    expect(new WireSegment(wirecode, startPoint).end).toStrictEqual(expected_endpoint);
  });

  it('throws if you pass it something dumb', () => {
    expect(() => {
      new WireSegment("W10", {x: 0, y: 0}); //wumbo directionality to be implemented in a later release
    }).toThrow("wtf man");
  });
  
});

describe('wire segment intersection', () => {
  it('returns the intersection point when the lines intersect', () => {
    let ws1 = new WireSegment("U3", new Point(0, 0));
    let ws2 = new WireSegment("R3", new Point(-1, 1));

    expect(ws1.intersection(ws2)).toStrictEqual(new Point(0, 1));
  });

  it("returns 0,0 when the lines don't intersect", () => { //this is kinda cheating, but 0, 0 is off limits anyway
    let ws1 = new WireSegment("D3", new Point(0, 0));
    let ws2 = new WireSegment("R3", new Point(-1, 10));

    expect(ws1.intersection(ws2)).toStrictEqual(new Point(0, 0));
  });
});

describe('point on segment', () => {
  it('is true when the point is on the segment', () => {
    let ws = new WireSegment("D3", new Point(0, 0));
    expect(ws.pointOnSegment(new Point(0, -1))).toBe(true);
  });

  it('is false when the point is not on the segment', () => {
    let ws = new WireSegment("D3", new Point(0, 0));
    expect(ws.pointOnSegment(new Point(0, 1))).toBe(false);
  });

});


describe('getWireSegments', () => {
  it('does', () => {
    let segs = getWireSegments(["R3", "U3", "L3", "D3"]);

    expect(segs.length).toBe(4);
  });
});

describe('getWireIntersections', () => {
  it('does', () => {
    let wire1 = [ new WireSegment("U3", new Point(0, 0)),
                  new WireSegment("L3", new Point(-45, 12)) ]
    let wire2 = [ new WireSegment("R3", new Point(-1, 1)),
                  new WireSegment("D4", new Point(-46, 14)) ]

    let expected_intersections = [new Point(0, 1), new Point(-46, 12)]

    expect(getWireIntersections(wire1, wire2)).toStrictEqual(expected_intersections);
  });
});

describe('countStepsToPoint', () => {
  it('does', () => {
    let wire = [ new WireSegment("U3", new Point(0, 0)),
                  new WireSegment("L3", new Point(0, 3)) ]
    let point = new Point(-1, 3);

    expect(countStepsToPoint(wire, point)).toBe(4);
  });

  it('stops counting when it hits the target point', () => {
    let wire = [ new WireSegment("U3", new Point(0, 0)),
                  new WireSegment("L3", new Point(0, 3)),
                  new WireSegment("D3", new Point(-3, 3))
                 ]
    let point = new Point(-1, 3);

    expect(countStepsToPoint(wire, point)).toBe(4);
  });

});

