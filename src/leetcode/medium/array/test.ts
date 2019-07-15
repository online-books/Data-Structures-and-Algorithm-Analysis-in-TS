import {
    groupAnagrams,
    increasingTriplet,
    lengthOfLongestSubstring,
    longestPalindrome,
    setZeroes,
    threeSum,
} from './index';

describe.skip('Array and Strings', () => {
    it('3 sum', () => {
        const nums = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6];
        const result = threeSum(nums);
        expect(result).toEqual([[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]])
    });
    it('Set Matrix Zeroes', () => {
        const input = [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ];
        setZeroes(input);
    });
    it('Group Anagrams', () => {
        const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
        const output = groupAnagrams(input);
        console.log(output);
    });
    it('Longest Substring Without Repeating Characters', () => {
        const input = 'pwwkew';
        const output = lengthOfLongestSubstring(input);
        expect(output).toBe(3);
    });
    it('Longest Palindromic Substring', () => {
        const input = 'babad';
        const output = longestPalindrome(input);
        console.log(output);
    });
    it('Increasing Triplet Subsequence', () => {
        expect(increasingTriplet([2, 4, -2, -3])).toBeFalsy();
    })
})