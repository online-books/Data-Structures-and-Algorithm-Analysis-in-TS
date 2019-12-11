/**
 * Climbing Stairs
 * You are climbing a stair case. It takes n steps to reach to the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * Note: Given n will be a positive integer.
 */

export function climbStairs(n: number): number {

    const cache: { [propName: number]: number } = {};
    function helper(num: number) {
        if (num <= 2) {
            return num;
        }
        if (typeof cache[num] === 'undefined') {
            cache[num] = helper(num - 1) + helper(num - 2);
            return cache[num];
        }
        return cache[num];

    }
    return helper(n);
}

/**
 * Best Time to Buy and Sell Stock
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
 * Note that you cannot sell a stock before you buy one.
 */

export function maxProfit(prices: number[]): number {
    let max = 0;
    let current = 0;
    for (let i = 1; i < prices.length; i++) {
        current += prices[i] - prices[i - 1];
        if (current < 0) {
            current = 0;
        }
        if (current > max) {
            max = current;
        }
    }
    return max;
}

/**
 * Maximum Subarray
 * Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
 */

export function maxSubArray(nums: number[], type = 1): number {
    function iteractive(): number {
        let max = nums[0];
        let current = nums[0];
        const {
            length
        } = nums;
        for (let i = 1; i < length; i++) {
            const value = nums[i];
            current += value;
            current = Math.max(current, value);
            if (current > max) {
                max = current;
            }
        }
        return max;
    }
    function diviedAndConquer(start: number, end: number): number {
        if (start === end) {
            return nums[start];
        }
        const middle = Math.floor((start + end) / 2);
        const leftVal = diviedAndConquer(start, middle);
        const rigtVal = diviedAndConquer(middle + 1, end);
        let leftBorder = nums[middle];
        let rightBorder = nums[middle + 1];
        let maxLeftBorder = nums[middle];
        let maxRightBorder = nums[middle + 1];
        for (let i = middle - 1; i >= start; i--) {
            leftBorder += nums[i];
            if (leftBorder > maxLeftBorder) {
                maxLeftBorder = leftBorder;
            }
        }
        for (let j = middle + 2; j <= end; j++) {
            rightBorder += nums[j];
            if (rightBorder > maxRightBorder) {
                maxRightBorder = rightBorder;
            }
        }
        const maxSum = Math.max(leftVal, rigtVal, maxLeftBorder + maxRightBorder);
        return maxSum;
    }
    if (type) {
        return iteractive();
    }
    return diviedAndConquer(0, nums.length - 1);
}

/**
 * House Robber
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
 * Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
 */


export function rob(nums: number[]): number {
    const cache = {};
    function helper(index: number): number {
        if (index === 0) {
            return nums[index];
        }
        if (index === 1) {
            const [first, second] = nums;
            return Math.max(first, second);
        }

        if (cache[index] !== undefined) {
            return cache[index];
        }
        const result = Math.max(nums[index] + helper(index - 2), helper(index - 1));
        cache[index] = result;
        return result;
    }
    if (!nums.length) {
        return 0;
    }
    return helper(nums.length - 1);
}
