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
    if (!length) {
        return 0;
    }
    const dp: number[] = new Array(length + 1).fill(0);
    dp[0] = 1;
    dp[1] = s[0] !== '0' ? 1 : 0;
    for (let i = 2; i <= length; i++) {
        const num = Number(s[i - 1]);
        const sum = Number(s.slice(i - 2, i));
        if (num >= 1 && num <= 9) {
            dp[i] += dp[i - 1];
        }
        if (sum >= 10 && sum <= 26) {
            dp[i] += dp[i - 2];
        }
        if (dp[i] === 0) {
            return 0;
        }
    }
    return dp[length];
}

/**
 * Best Time to Buy and Sell Stock with Cooldown
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:
 * You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
 * After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
 */
export function maxProfit(prices: number[]): number {
    const {
        length,
    } = prices;
    if (!length) {
        return 0;
    }
    const dp: number[] = new Array(length).fill(0);
    dp[1] = prices[1] === undefined ? 0 : Math.max(prices[1] - prices[0], 0);
    let profit = dp[1];
    for (let i = 2; i < length; i++) {
        const cur = prices[i];
        const prev = prices[i - 1];
        const diff = cur - prev;
        const profit1 = Math.max(diff, 0) + dp[i - 2];
        let profit2 = Math.max(prices[i - 1] - prices[i - 2], 0);
        if (i > 2) {
            profit2 += dp[i - 3]
        }
        dp[i] = Math.max(profit, profit1, profit2);
    }
    return dp[length - 1];
}