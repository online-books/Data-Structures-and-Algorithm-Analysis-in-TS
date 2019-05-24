/**
 * Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? 
 * Find all unique triplets in the array which gives the sum of zero.
 * @param {number[]} arr 
 */
export function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    const arr = nums.sort((a, b) => a - b);
    const len = arr.length;
    for (let i = 0; i < len - 2; i++) {
        const val1 = arr[i];
        if (val1 > 0) {
            return result;
        }
        if (i === 0 || (i > 0 && arr[i] !== arr[i - 1])) {
            let j = i + 1;
            let k = len - 1;
            const twoSum = 0 - val1;
            while (k > j) {
                const val2 = arr[j];
                const val3 = arr[k];
                const sum = val2 + val3;
                if (sum > twoSum) {
                    k--;
                } else if (sum === twoSum) {
                    result.push([val1, val2, val3]);
                    while (j < k && arr[k] === arr[k - 1]) {
                        k--;
                    }
                    while (j < k && arr[j] === arr[j + 1]) {
                        j++;
                    }
                    k--;
                    j++;
                } else {
                    j++;
                }
            }
        }
    }
    return result;
}

/**
 * 
 * Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place. * 
 * @param matrix 
 */
export function setZeroes(matrix: number[][]): void {
    const rows = matrix.length;
    if (!rows) {
        return;
    }
    const columns = matrix[0].length;
    let isColum0 = false;
    for (let i = 0; i < rows; i++) {
        if (matrix[i][0] === 0) {
            isColum0 = true;
        }
        for (let j = 1; j < columns; j++) {
            if (matrix[i][j] === 0) {
                matrix[0][j] = matrix[i][0] = 0;
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
}

/**
 * Given an array of strings, group anagrams together.
 * 
 * @param {string[]} strs
 * @return {string[][]}
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
 * Given a string, find the length of the longest substring without repeating characters.
 * @param {string} s
 * @returns {number}
 */

export function lengthOfLongestSubstring(s: string): number {
    const len = s.length;
    let maxLength = 0;
    let subStr = '';
    for (let i = 0; i < len; i++) {
        const val = s[i];
        const index = subStr.indexOf(val);
        if (index >= 0) {
            const currentLen = subStr.length;
            if (maxLength < currentLen) {
                maxLength = currentLen
            }
            subStr = subStr.slice(index + 1).concat(val);
        } else {
            subStr = subStr.concat(val);
        }
    }
    return Math.max(maxLength, subStr.length);
}

/**
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 * @param  s 
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
 * Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.
 * @param nums 
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