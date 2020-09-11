import { turnpike } from "../../algorithm/backtracking";

describe("backtracking", () => {
  test("turnpike", () => {
    expect(turnpike([1], 2)).toEqual([0, 1]);
    expect(turnpike([1, 2], 2)).toBeNull();
    expect(turnpike([1, 2, 3], 3)).toEqual([0, 2, 3]);
    expect(turnpike([1, 2, 2, 3, 4, 5], 4)).toEqual([0, 2, 4, 5]);
    expect(
      turnpike([1, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 8, 10], 6)
    ).toEqual([0, 3, 5, 6, 8, 10]);
  });
});
