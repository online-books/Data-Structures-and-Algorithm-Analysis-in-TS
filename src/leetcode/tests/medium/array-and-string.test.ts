import {
  groupAnagrams,
  increasingTriplet,
  lengthOfLongestSubstring,
  longestPalindrome,
  setZeroes,
  threeSum,
} from "@src/leetcode/medium/array-and-string";

describe("medium => Array and Strings", () => {
  test("3 sum", () => {
    const nums = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6];
    const result = threeSum(nums);
    expect(result).toEqual([
      [-4, -2, 6],
      [-4, 0, 4],
      [-4, 1, 3],
      [-4, 2, 2],
      [-2, -2, 4],
      [-2, 0, 2],
    ]);
  });
  test("Set Matrix Zeroes", () => {
    const input = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    setZeroes(input);
  });
  test("Group Anagrams", () => {
    const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const output = groupAnagrams(input);
    expect(output).toEqual([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]);
  });
  test("Longest Substring Without Repeating Characters", () => {
    expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
    expect(lengthOfLongestSubstring(" ")).toBe(1);
    expect(lengthOfLongestSubstring("ab")).toBe(2);
    expect(lengthOfLongestSubstring("cdd")).toBe(2);
  });
  test("Longest Palindromic Substring", () => {
    const input = "babad";
    expect(longestPalindrome(input).length).toBe(3);
  });
  test("Increasing Triplet Subsequence", () => {
    expect(increasingTriplet([2, 4, -2, -3])).toBeFalsy();
  });
});
