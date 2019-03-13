/**
 * 问题：Climbing Stairs
 * 描述：You are climbing a stair case. It takes n steps to reach to the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * Note: Given n will be a positive integer.
 * 解析：该题实际是斐波那契数列，因为爬上第n层梯子从n-1或者n-2上去即可，故f(n)=f(n-1)+f(n-2),用动态规划解决
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
    let result=0;
    while (i <= n) {
        result = prev + prev2;
        prev2=prev;
        prev=result;
        i++;
    }
    return result;
}

/**
 * 问题： Best Time to Buy and Sell Stock
 * 描述：Say you have an array for which the ith element is the price of a given stock on day i.
 * If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
 * Note that you cannot sell a stock before you buy one.
 * 解析：
 */


