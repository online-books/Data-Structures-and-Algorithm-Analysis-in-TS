/**
 * Remove Duplicates from Sorted Array
 * Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.
 * Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
 */

export function removeDuplicates (nums: number[]) {
    if (nums.length <= 1) {
        return nums.length;
    }
    let selectedNumber = nums[0];
    for (let i = 1; i < nums.length;) {
        if (nums[i] === selectedNumber) {
            nums.splice(i, 1);
        } else {
            selectedNumber = nums[i];
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
export function maxProfit (prices: number[]): number {
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
 */
export function rotate (nums: number[], k: number): void {
    const len = nums.length;
    let n = 1;
    while (n <= k) {
        const [value] = nums.splice(len - 1, 1);
        nums.unshift(value);
        n += 1;
    }
}

/**
 * Contains Duplicate
 * Given an array of integers, find if the array contains any duplicates.
 * Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
 */

export function containsDuplicate (nums: any[]): boolean {
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

export function singleNumber (nums: number[]) {
    const len = nums.length;
    const obj = {};
    for (let i = 0; i < len; i++) {
        const value = nums[i];
        if (obj[value] == null) {
            obj[value] = 1;
        } else {
            obj[value] = obj[value] + 1;
        }
    }
    for (const key in obj) {
        if (obj[key] === 1) {
            return Number(key);
        }
    }
    return;
}

/**
 * Intersection of Two Arrays II
 * Given two arrays, write a function to compute their intersection.
 * Each element in the result should appear as many times as it shows in both arrays.
 * The result can be in any order.
 */
export function intersect (nums1: number[], nums2: number[]): number[] {
    const len1 = nums1.length;
    const result = [];
    for (let i = 0; i < len1; i++) {
        const value = nums1[i];
        const index = nums2.findIndex(item => item === value);
        if (index > -1) {
            result.push(nums2[index]);
            nums2.splice(index, 1);
        }
    }
    return result;
}
/**
 *  Plus One
 */
export function plusOne (digits: number[]): number[] {
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
 * Note:
 * You must do this in-place without making a copy of the array.
 * Minimize the total number of operations.
 */
export function moveZeroes (nums: number[]): number[] {
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


export function twoSum (nums: number[], target: number): number[] {
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

export function isValidSudoku (board: string[][]): boolean {
    const len = board.length;
    const itemLen = board[0].length;
    function checkArr (arr: string[]): boolean {
        arr = arr.filter(val => val !== '.');
        if (!arr.length) {
            return false;
        }
        if (containsDuplicate(arr)) {
            return false;
        }
        return true;
    }
    for (let i = 0; i < len; i++) {
        // 横轴检查
        if (!checkArr(board[i])) {
            return false;
        }
        const arr = [];
        // 纵轴检查
        for (let j = 0; j < itemLen; j++) {
            arr.push(board[j][i]);
            let anotherArr: string[] = [];
            // 3x3检查
            if (i % 3 === 0 && j % 3 === 0) {
                anotherArr = anotherArr.concat(board[i].slice(j, j + 3));
                anotherArr = anotherArr.concat(board[i + 1].slice(j, j + 3));
                anotherArr = anotherArr.concat(board[i + 2].slice(j, j + 3));
                if (!checkArr(anotherArr)) {
                    return false;
                }
            }

        }
        if (!checkArr(arr)) {
            return false;
        }

    }
    return true;

}

/**
 * Rotate Image
 */
export function rotateImage (matrix: number[][]): void {
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

}
