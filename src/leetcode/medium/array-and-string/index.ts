import { compare } from '../../../share/utils';

/**
 * 3Sum
 * Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
 * Find all unique triplets in the array which gives the sum of zero.
 */

export function threeSum(nums: number[], n = 0): number[][] {
    const {
        length
    } = nums;
    const result: number[][] = [];
    const sortedNums = nums.sort(compare);
    for (let i = 0; i < length - 2; i++) {
        const currentVal = sortedNums[i];
        if (i === 0 || currentVal !== sortedNums[i - 1]) {
            const twoSum = n - currentVal;
            let j = i + 1;
            let k = length - 1;
            while (k > j) {
                const val = sortedNums[j] + sortedNums[k];
                if (val === twoSum) {
                    result.push([currentVal, sortedNums[j], sortedNums[k]]);
                    while (k > j && sortedNums[k] === sortedNums[k - 1]) {
                        k--;
                    }
                    while (j < k && sortedNums[j] === sortedNums[j + 1]) {
                        j++;
                    }
                    k--;
                    j++;
                } else if (val > twoSum) {
                    k--;
                } else {
                    j++;
                }
            }
        }
    }
    return result;
}

/**
 * Set Matrix Zeroes
 * Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
 * Could you devise a constant space solution?
 */
export function setZeroes(matrix: number[][]): number[][] {
    const rows = matrix.length;
    if (!rows) {
        return matrix;
    }
    const columns = matrix[0].length;
    let isColum0 = false;
    for (let i = 0; i < rows; i++) {
        if (matrix[i][0] === 0) {
            isColum0 = true;
        }
        for (let j = 1; j < columns; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = rows - 1; i >= 0; i--) {
        for (let j = columns - 1; j >= 1; j--) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
        if (isColum0) {
            matrix[i][0] = 0;
        }
    }
    return matrix;
}

/**
 * Group Anagrams
 * Given an array of strings, group anagrams together.
 */

export function groupAnagrams(strs: string[]): string[][] {
    const cache: { [propName: string]: string[] } = {};
    strs.forEach((str) => {
        const sortedStr = str.split('').sort().join();
        if (cache[sortedStr]) {
            cache[sortedStr].push(str);
        } else {
            cache[sortedStr] = [str];
        }
    });
    return Object.values(cache);

};

/**
 * Longest Substring Without Repeating Characters
 * Given a string, find the length of the longest substring without repeating characters.
 */

export function lengthOfLongestSubstring(s: string): number {
    const {
        length,
    } = s;
    let maxSubStrLen = 0;
    let subStr = '';
    for (let i = 0; i < length; i++) {
        const val = s[i];
        const index = subStr.indexOf(val);
        if (index >= 0) {
            if (subStr.length > maxSubStrLen) {
                maxSubStrLen = subStr.length;
            }
            subStr = subStr.slice(index + 1) + val;
        } else {
            subStr += val;
        }
    }
    return Math.max(maxSubStrLen, subStr.length);
}

/**
 * Longest Palindromic Substring
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 */

export function longestPalindrome(s: string): string {
    const len = s.length;
    if (len < 2) {
        return s;
    }
    let maxLength = 0;
    let index = 0;
    const getPalindromeMaxLength = (start: number, end: number): void => {
        while ((start >= 0 && end <= len) && (s[start] === s[end])) {
            start--;
            end++;
        }
        const currentLen = end - start - 1;
        if (maxLength < currentLen) {
            maxLength = currentLen;
            index = start;
        }
    }
    for (let i = 0; i < len; i++) {
        getPalindromeMaxLength(i, i);
        getPalindromeMaxLength(i, i + 1);
    }
    return s.substr(index + 1, maxLength);
}

/**
 * Increasing Triplet Subsequence
 * Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.
 * Note: Your algorithm should run in O(n) time complexity and O(1) space complexity.
 */
export function increasingTriplet(nums: number[]): boolean {
    let small = Number.MAX_VALUE;
    let big = Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        if (value <= small) {
            small = value
        } else if (value <= big) {
            big = value;
        } else {
            return true;
        }
    }
    return false;
}
