import {
  maxProduct,
  maxProfit,
  numDecodings,
} from "@src/leetcode/hard/dynamic-programming";

describe("Hard => Dynamic Programming", () => {
  test("Maximum Product Subarray", () => {
    expect(maxProduct([2, 3, -2, 4])).toBe(6);
    expect(maxProduct([-2, 0, -1])).toBe(0);
    expect(maxProduct([-2, 0, -1, -6])).toBe(6);
    expect(maxProduct([0, 2])).toBe(2);
    expect(maxProduct([-2, 3, -4])).toBe(24);
    expect(maxProduct([-2, 3, -4, -5, 2, -1])).toBe(240);
    expect(maxProduct([2, -5, -2, -4, 3])).toBe(24);
  });
  test("Decode Ways", () => {
    expect(numDecodings("12")).toBe(2);
    expect(numDecodings("31")).toBe(1);
    expect(numDecodings("226")).toBe(3);
    expect(numDecodings("0")).toBe(0);
    expect(numDecodings("10")).toBe(1);
    expect(numDecodings("100")).toBe(0);
    expect(numDecodings("1010")).toBe(1);
    expect(numDecodings("110")).toBe(1);
    expect(numDecodings("1212")).toBe(5);
  });
  test("Best Time to Buy and Sell Stock with Cooldown", () => {
    expect(maxProfit([1, 2, 3, 0, 2])).toBe(3);
  });
});
