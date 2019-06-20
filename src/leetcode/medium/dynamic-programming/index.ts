/**
 *  Jump Game
 * @param nums 
 */
export function canJump(nums: number[]): Boolean {
    const {
        length
    } = nums;
    let i = 0;
    for (let reach = 0; i < length && i <= reach; i++) {
        reach = Math.max(i + nums[i], reach);
    }
    return i === length;
}

/**
 * Unique Paths
 * @param m 
 * @param n 
 */

const pathCache = {};

export function uniquePaths(m: number, n: number): number {
    if (m === 1) {
        return 1;
    }
    if (n === 1) {
        return 1;
    }
    const cacheKey = m + '-' + n;
    const cacheValue = pathCache[cacheKey];
    if (typeof cacheValue !== 'undefined') {
        return cacheValue;
    }
    const num = uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
    pathCache[cacheKey] = num;
    return num;
}

/**
 * Coin Change
 * You are given coins of different denominations and a total amount of money amount. 
 * Write a function to compute the fewest number of coins that you need to make up that amount. 
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * @param coins 
 * @param amount 
 */
export function coinChange(coins: number[], amount: number): number {
    if (amount < 1) {
        return 0
    };
    const cache = {};
    const {
        length,
    } = coins;
    return helper(amount);
    function helper(rem: number): number {
        if (rem === 0) {
            return 0;
        }
        if (rem < 0) {
            return -1;
        }
        if (typeof cache[rem] === 'number') {
            return cache[rem];
        }

        let min = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < length; i++) {
            const num = helper(rem - coins[i]);
            if (num >= 0 && min > num) {
                min = 1 + num;
            }
        }
        min = min === Number.MAX_SAFE_INTEGER ? -1 : min;
        cache[rem] = min;
        return min;
    }
}

/**
 * Longest Increasing Subsequence
 * Given an unsorted array of integers, find the length of longest increasing subsequence.
 * @param nums 
 */
export function lengthOfLIS(nums: number[]): number {
    const {
        length,
    } = nums;
    if (!length) {
        return 0;
    }
    const arr = new Array(length).fill(1);
    for (let i = 1; i < length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                arr[i] = Math.max(arr[i], arr[j] + 1);
            }
        }
    }
    let result = 0;
    for (let i = 0; i < length; i++) {
        result = Math.max(result, arr[i]);
    }
    return result;
}

export function lengthOfLISBetter(nums: number[]): number {
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