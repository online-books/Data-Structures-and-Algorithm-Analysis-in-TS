import {
  climbStairs,
  maxProfit,
  maxSubArray,
  rob,
} from "@src/leetcode/easy/dynamic-programming";

describe("easy => dynamic programming", () => {
  test("clime stairs", () => {
    expect(climbStairs(3)).toBe(3);
  });
  test("max profit", () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
  test("max profit", () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    expect(maxSubArray([-1, -2, -3], 0)).toBe(-1);
    expect(maxSubArray([-2, 1, -3])).toBe(1);
  });
  test("House Robber", () => {
    expect(rob([1, 2, 3, 1])).toBe(4);
  });
});
