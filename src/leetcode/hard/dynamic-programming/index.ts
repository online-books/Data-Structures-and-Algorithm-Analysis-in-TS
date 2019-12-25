/**
 * Maximum Product Subarray
 * Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
 */

export function maxProduct(nums: number[]): number {
    const {
        length
    } = nums;
    let result = nums[0];
    const getProduct = (max: number, min: number, index: number) => {
        if (index === length) {
            return;
        }
        const val = nums[index];
        if (val < 0) {
            [max, min] = [min, max];
        }
        max = Math.max(val, max * val);
        min = Math.min(val, min * val);
        result = Math.max(result, max);
        getProduct(max, min, index + 1);
    }
    getProduct(result, result, 1)
    return result;
}

/**
 * Decode Ways
 * A message containing letters from A-Z is being encoded to numbers using the following mapping:
 * 'A' -> 1,'B' -> 2,...,'Z' -> 26
 * Given a non-empty string containing only digits, determine the total number of ways to decode it.
 */

export function numDecodings(s: string): number {
    const {
        length
    } = s;
    let count = 0;
    console.log(s);
    for (let i = 0; i < length; i++) {
        const num = Number(s[i]);
        if (num === 0) {
            if (i === 0 || Number(s.slice(i - 1, i + 1)) > 26) {
                return 0;
            }
        } else {
            if (Number(s.slice(i - 1, i + 1)) < 27) {
                count += 1;
            }
        }
    }
    return count;
}

/**
 * Best Time to Buy and Sell Stock with Cooldown
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:
 * You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
 * After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
 */
export function maxProfit(prices: number[]): number {
    return 0;
}