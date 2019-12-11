import {
    compare,
} from '../../../share/utils';


/**
 * Remove Duplicates from Sorted Array
 * Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.
 * Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
 */

export function removeDuplicates(nums: number[]): number {
    if (nums.length <= 1) {
        return nums.length;
    }
    for (let i = 1; i < nums.length;) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1);
        } else {
            i++;
        }
    }
    return nums.length;
};

/**
 * Best Time to Buy and Sell Stock II
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).
 * Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
 */
export function maxProfit(prices: number[]): number {
    const len = prices.length;
    let profit = 0;
    for (let i = 1; i < len; i++) {
        profit += Math.max(0, prices[i] - prices[i - 1]);
    }
    return profit;
};

/**
 * Rotate Array
 * Given an array, rotate the array to the right by k steps, where k is non-negative.
 * Could you do it in-place with O(1) extra space?
 */
export function rotate(nums: number[], k: number): void {
    if (nums.length) {
        let n = 1;
        while (n <= k) {
            const value = nums.pop() as number;
            nums.unshift(value);
            n += 1;
        }
    }
}

/**
 * Contains Duplicate
 * Given an array of integers, find if the array contains any duplicates.
 * Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
 */

export function containsDuplicate(nums: any[]): boolean {
    const obj = {};
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        const value = nums[i];
        if (typeof obj[value] !== 'undefined') {
            return true;
        } else {
            obj[value] = value;
        }

    }
    return false;
}

/**
 * Single Number.
 * Given a non-empty array of integers, every element appears twice except for one. Find that single one.
 * Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
 */

export function singleNumber(nums: number[]): number {
    return nums.reduce((cur, next) => cur ^ next);
}

/**
 * Intersection of Two Arrays II
 * Given two arrays, write a function to compute their intersection.
 * Each element in the result should appear as many times as it shows in both arrays.
 * The result can be in any order.
 * What if the given array is already sorted? How would you optimize your algorithm?
 * What if nums1's size is small compared to nums2's size? Which algorithm is better?
 * What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
 */

export function intersect(nums1: number[], nums2: number[]): number[] {
    const arr1 = nums1.sort(compare);
    const arr2 = nums2.sort(compare);
    const result: number[] = [];
    const len1 = arr1.length;
    const len2 = arr2.length;
    let i = 0;
    let j = 0;
    while (j < len2 && i < len1) {
        const val1 = arr1[i];
        const val2 = arr2[j];
        if (val1 > val2) {
            j += 1;
        } else if (val1 === val2) {
            result.push(val1);
            i += 1;
            j += 1;
        } else {
            i += 1;
        }
    }
    return result;
}
/**
 * Plus One
 * Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
 * The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.
 * You may assume the integer does not contain any leading zero, except the number 0 itself.
 */
export function plusOne(digits: number[]): number[] {
    const max = digits.length - 1;
    for (let i = max; i >= 0;) {
        const value = digits[i];
        if (value < 9) {
            digits[i] = value + 1;
            break;
        } else {
            digits[i] = 0;
            i--;
            if (i < 0) {
                digits.unshift(1);
            }
        }
    }
    return digits;
}

/**
 * Move Zeroes
 * Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note:You must do this in-place without making a copy of the array.
 * Minimize the total number of operations.
 */
export function moveZeroes(nums: number[]): number[] {
    const len = nums.length;
    let movedNum = 0;
    for (let i = 0; i < len;) {
        const value = nums[i];
        if (!value) {
            nums.splice(i, 1);
            nums.push(value);
            movedNum++;
        } else {
            i++;
        }
        if (movedNum + i === len) {
            break;
        }
    }
    return nums;
}

/**
 * Two Sum
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 */


export function twoSum(nums: number[], target: number): number[] {
    const obj = {};
    const len = nums.length;
    const result = [];
    for (let i = 0; i < len; i++) {
        const value = nums[i];
        const exist = obj[target - value];
        if (typeof exist === 'number') {
            result.push(i);
            result.push(exist);
        } else {
            obj[value] = i;
        }
    }
    return result;
}

/**
 * Valid Sudoku
 * Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
 * Each row must contain the digits 1-9 without repetition.
 * Each column must contain the digits 1-9 without repetition.
 * Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 */

export function isValidSudoku(board: string[][]): boolean {
    const cache = {};
    for (let i = 0; i < 9; i++) {
        const num = Math.floor(i / 3);
        for (let j = 0; j < 9; j++) {
            const value = board[i][j];
            if (value === '.') {
                continue;
            }
            const rowKey = `row-${i}-${value}`;
            const columnKey = `column-${j}-${value}`;
            const blockKey = `block-${num}-${Math.floor(j / 3)}-${value}`;
            if (cache[rowKey] !== undefined || cache[columnKey] !== undefined || cache[blockKey] !== undefined) {
                return false;
            }
            cache[rowKey] = value;
            cache[columnKey] = value;
            cache[blockKey] = value;
        }
    }
    return true;
}

/**
 * Rotate Image
 * You are given an n x n 2D matrix representing an image.
 * Rotate the image by 90 degrees (clockwise).
 * Given input matrix =[[1,2,3],[4,5,6],[7,8,9]]
 * rotate the input matrix in-place such that it becomes:[[7,4,1],[8,5,2],[9,6,3]]
 */
export function rotateImage1(matrix: number[][]): number[][] {
    const l = matrix.length - 1;
    let border = 0;
    while (border <= Math.floor(l / 2)) {
        let start = border;
        while (start <= l - 1 - border) {
            const leftTop = [border, start];
            const rightTop = [start, l - border];
            const rightBottom = [l - border, l - start];
            const leftBottom = [l - start, border];
            const initialValue = matrix[leftBottom[0]][leftBottom[1]];
            [leftTop, rightTop, rightBottom, leftBottom].reduce((prev, current, index) => {
                const [i, j] = current;
                const currentValue = matrix[i][j];
                matrix[i][j] = prev;
                return currentValue;
            }, initialValue);
            start += 1;
        }
        border += 1;
    }
    return matrix;
}

export function rotateImage2(matrix: number[][]): number[][] {
    matrix.reverse();
    const row = matrix.length;
    const column = matrix[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = i + 1; j < column; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    return matrix;
}


