/**
 * 问题：Climbing Stairs
 * 描述：You are climbing a stair case. It takes n steps to reach to the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * Note: Given n will be a positive integer.
 * 解析：该题实际是斐波那契数列，因为爬上第n层梯子从n-1或者n-2上去即可，故f(n)=f(n-1)+f(n-2),
 */

export function climbStairs(n: number): number {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    if (n === 3) {
        return 3;
    }
    let prev = 3;
    let prev2 = 2;
    let i = 4;
    let result = 0;
    while (i <= n) {
        result = prev + prev2;
        prev2 = prev;
        prev = result;
        i++;
    }
    return result;
}

/**
 * 问题： Best Time to Buy and Sell Stock
 * 描述：Say you have an array for which the ith element is the price of a given stock on day i.
 * If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
 * Note that you cannot sell a stock before you buy one.
 */

export function maxProfit(prices: number[]): number {
    const len = prices.length;
    let profit = 0;
    let result = 0;
    for (let i = 1; i < len; i++) {
        profit += (prices[i] - prices[i - 1]);
        profit = Math.max(0, profit);
        result = Math.max(result, profit);
    }
    return result;
}

/**
 * 问题： Maximum Subarray
 * 描述： Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
 */

export function maxSubArray(nums: number[]): number {
    const len = nums.length;
    if (!len) {
        return 0;
    }
    let result = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < len; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        result = Math.max(currentSum, result);
    }
    return result;
}

/**
 * 问题：House Robber
 * 描述：You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
 * Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
 * 分析：是否抢劫第n家取决于f(n)+f(n-2)与f(n-1)的大小
 */


export function rob(nums: number[]): number {
    if (nums.length === 0) {
        return 0;
    }
    let prev = 0;
    let prev2 = 0;
    for (let i = 0; i < nums.length; i++) {
        const tmp = prev;
        prev = Math.max(nums[i] + prev2, prev);
        prev2 = tmp;
    }
    return prev;
}
