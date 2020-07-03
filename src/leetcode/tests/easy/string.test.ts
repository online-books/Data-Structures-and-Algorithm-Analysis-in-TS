import {
  firstUniqChar,
  isAnagram,
  isPalindrome,
  longestCommonPrefix,
  reverseInteger,
  reverseString,
  stringToNumber,
  strStr,
} from "@src/leetcode/easy/string";

describe("easy => Strings", () => {
  test("Reverse String", () => {
    const input = ["H", "a", "n", "n", "a", "h"];
    const output = ["h", "a", "n", "n", "a", "H"];
    expect(reverseString(input)).toEqual(output);
  });
  test("Reverse Integer", () => {
    expect(reverseInteger(-123)).toBe(-321);
    expect(reverseInteger(1534236469)).toBe(0);
  });
  test("First Unique Character in a String", () => {
    expect(firstUniqChar("leetcode")).toBe(0);
  });
  test("Valid Anagram", () => {
    expect(isAnagram("rat", "car")).toBeFalsy();
    expect(isAnagram("anagram", "nagaram")).toBeTruthy();
  });
  test("Valid Palindrome", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBeTruthy();
    expect(isPalindrome("race a car")).toBeFalsy();
    expect(isPalindrome("0P")).toBeFalsy();
  });
  test("String to Integer", () => {
    expect(stringToNumber("   -42")).toBe(-42);
    expect(stringToNumber("+1")).toBe(1);
    expect(stringToNumber("4193 with words")).toBe(4193);
    expect(stringToNumber("words and 987")).toBe(0);
  });
  test("strStr", () => {
    expect(strStr("hello", "ll")).toBe(2);
    expect(strStr("aaaaa", "bba")).toBe(-1);
    expect(strStr("a", "a")).toBe(0);
  });
  test("Longest Common Prefix", () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
    expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
    expect(longestCommonPrefix(["c", "c"])).toBe("c");
  });
});
