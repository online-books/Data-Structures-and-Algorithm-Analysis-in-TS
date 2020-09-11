import { minDistance } from "../../algorithm/divide-conquer";

describe("divide conquer", () => {
  test("min distance", () => {
    const data = [
      { x: 2, y: 2 },
      { x: 1, y: 1 },
      { x: 0.9, y: 0.9 },
      { x: 1 / 2, y: 1 / 2 },
      { x: 4, y: 4 },
    ];
    const dis = minDistance(data);
    expect(dis.toFixed(2)).toBe(Math.sqrt(1 / 50).toFixed(2));
  });
});
