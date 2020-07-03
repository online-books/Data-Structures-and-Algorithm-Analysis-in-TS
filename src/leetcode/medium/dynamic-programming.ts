
/**
 * Jump Game
 * Given an array of non-negative integers, you are initially positioned at the first index of the array.
 * Each element in the array represents your maximum jump length at that position.
 * Determine if you are able to reach the last index.
 */

export function canJump(nums: number[]): boolean {
    const {
        length
    } = nums;
    let i = 0;
    for (let reach = 0; i < length && i <= reach; i++) {
        reach = Math.max(nums[i] + i, reach);
    }
    return i === length;
}

/**
 * Unique Paths
 * A robot is located at the top-left corner of a m x n grid.
 * The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid
 * How many possible unique paths are there?
 */
export function uniquePaths(m: number, n: number): number {
    const cache = {};
    function helper(row: number, column: number): number {
        const key = `row${row}-column${column}`;
        if (cache[key]) {
            return cache[key];
        }
        if (row === 0 || column === 0) {
            return 0;
        }
        if (row === 1 || column === 1) {
            return 1;
        }
        const result = helper(row - 1, column) + helper(row, column - 1);
        cache[key] = result;
        return result;
    }
    return helper(m, n);
}


/**
 * Coin Change
 * You are given coins of different denominations and a total amount of money amount.
 * Write a function to compute the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1
 */

export function coinChange(coins: number[], amount: number): number {
    const {
        length,
    } = coins;
    const cache = {};
    function getCount(left: number): number {
        if (left === 0) {
            return 0;
        }
        if (left < 0) {
            return -1;
        }
        if (typeof cache[left] === 'number') {
            return cache[left];
        }
        let min = Number.MAX_VALUE;
        for (let i = 0; i < length; i++) {
            const value = coins[i];
            const num = getCount(left - value);
            if (num >= 0 && min > num) {
                min = 1 + num;
            }
        }
        min = min === Number.MAX_VALUE ? -1 : min;
        cache[left] = min;
        return min;
    }

    return getCount(amount);
}

/**
 * Longest Increasing Subsequence
 * Given an unsorted array of integers, find the length of longest increasing subsequence.
 * Your algorithm should run in O(n log n) complexity.
 */

export function lengthOfLIS(nums: number[]): number {
    const arr: number[] = [];
    let size = 0;
    nums.forEach(num => {
        let i = 0;
        let j = size;
        while (i !== j) {
            const m = Math.floor((i + j) / 2);
            if (num > arr[m]) {
                i = m + 1;
            } else {
                j = m;
            }
        }
        arr[i] = num;
        if (i === size) {
            size += 1;
        }
    });
    return size;
}