import {
    swap,
} from '../../../utils/index'

/**
 * Reverse String
 * Write a function that reverses a string. The input string is given as an array of characters char[].
 * Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
 * You may assume all the characters consist of printable ascii characters.
 * Example：
 * Input: ["h","e","l","l","o"],
 * Output: ["o","l","l","e","h"].
 */
export function reverseString(s: string[]): string[] {
    const len = s.length;
    if (!len || len === 1) {
        return s;
    }
    const end = len - 1;
    const middle = Math.floor(end / 2);
    for (let i = 0; i <= middle; i++) {
        swap(s, i, end - i);
    }
    return s;
}

/**
 * Reverse Integer
 * Given a 32-bit signed integer, reverse digits of an integer.
 * Example:
 * Input: 123,
 * Output: 321.
 */
export function reverseInteger(x: number): number {
    const prefix = x >= 0 ? '' : '-';
    const num = String(Math.abs(x)).split('').reverse().join('');
    const minValue = -Math.pow(2, 31);
    const maxValue = Math.pow(2, 31) - 1;
    const result = Number(prefix.concat(num));
    if (result > maxValue || result < minValue) {
        return 0;
    }
    return result;
}

/**
 * First Unique Character in a String
 * Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.
 * Examples：
 * s = "leetcode"，
 * return 0.
 */
export function firstUniqChar(s: string): number {
    const cache = {};
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const value = s[i];
        if (cache[value] === undefined) {
            cache[value] = 1;
        } else {
            cache[value] += 1;
        }
    }
    for (let i = 0; i < len; i++) {
        const value = s[i];
        if (cache[value] === 1) {
            return i;
        }
    }
    return -1;
}

/**
 * Valid Anagram
 * Given two strings s and t , write a function to determine if t is an anagram of s.
 * Example:
 * Input: s = "anagram", t = "nagaram",
 * Output: true
 */
export function isAnagram(s: string, t: string): boolean {
    return s.split('').sort().join() === t.split('').sort().join();
}

/**
 * Valid Palindrome
 * Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
 * Note: For the purpose of this problem, we define empty string as valid palindrome.
 * Example:
 * Input: "A man, a plan, a canal: Panama",
 * Output: true
 */

export function isPalindrome(s: string): boolean {
    const str = s.replace(/\W/g, '');
    const reversedStr = str.split('').reverse().join('');
    return str.toLowerCase() === reversedStr.toLowerCase();
}

export function stringToNumber(str: string): number {
    const s = str.replace(/\s/g, '');
    if (!s.length) {
        return 0;
    }
    const reg = /(^-?\+?[0-9]+)/;
    const result = s.match(reg);
    if (result) {
        const num = Number(result[0]);
        const maxValue = Math.pow(2, 31) - 1;
        const minValue = -Math.pow(2, 31)
        if (num > maxValue) {
            return maxValue;
        } else if (num < minValue) {
            return minValue;
        } else {
            return num;
        }
    }
    return 0;
}

export function strStr(haystack: string, needle: string): number {
    if (!needle) {
        return 0;
    }
    const {
        length,
    } = haystack;
    const firstVal = needle[0];
    const nLen = needle.length;
    for (let i = 0; i <= length - nLen; i++) {
        if (haystack[i] === firstVal) {
            if (haystack.slice(i, i + nLen) === needle) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * Longest Common Prefix
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 * Example:
 * Input: ["flower","flow","flight"],["dog","racecar","car"]
 *  Output: "fl",""
 */
export function longestCommonPrefix(strs: string[]): string {
    if (!strs.length) {
        return '';
    }
    if (strs.length === 1) {
        return strs[0];
    }
    const firstStr = strs[0];
    let step = 1;
    while (step <= firstStr.length) {
        for (let i = 1; i < strs.length; i++) {
            const str = strs[i];
            if (firstStr.slice(0, step) !== str.slice(0, step)) {
                return firstStr.slice(0, step - 1);
            }
        }
        step += 1;
    }
    return firstStr.slice(0, step - 1);
}