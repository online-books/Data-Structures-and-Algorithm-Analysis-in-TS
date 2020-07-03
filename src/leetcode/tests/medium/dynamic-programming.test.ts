import {
  canJump,
  coinChange,
  lengthOfLIS,
  uniquePaths,
} from "@src/leetcode/medium/dynamic-programming";
describe("dynamic programming", () => {
  test("Jump Game", () => {
    expect(canJump([2, 3, 1, 1, 4])).toBeTruthy();
    // expect(canJump([3, 2, 1, 0, 4])).toBeFalsy();
  });
  test("Unique Paths", () => {
    expect(uniquePaths(3, 2)).toBe(3);
    expect(uniquePaths(7, 3)).toBe(28);
  });
  test("Coin Change", () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3);
    expect(coinChange([1, 2, 4, 5], 8)).toBe(2);
    expect(coinChange([2], 3)).toBe(-1);
  });
  test("Longest Increasing Subsequence", () => {
    const input = [10, 9, 2, 5, 3, 7, 101, 18];
    expect(lengthOfLIS(input)).toBe(4);
  });
});
