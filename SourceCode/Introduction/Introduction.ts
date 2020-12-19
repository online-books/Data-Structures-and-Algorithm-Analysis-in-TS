/** @format */

/**
 * 最大子序列和问题之穷举法
 * @param  {number[]} n
 */

export function maxSubSequenceSum1(n: number[]): number {
    const {length} = n
    let currentSum = 0
    let maxSum = 0
    for (let i = 0; i < length; i++) {
        currentSum = 0
        for (let j = i; j < length; j++) {
            currentSum += n[j]
            if (currentSum > maxSum) {
                maxSum = currentSum
            }
        }
    }
    return maxSum
}

/**
 * 最大子序列和问题之分治法
 * @param  {number[]} n
 */

export function maxSubSequenceSum2(n: number[]): number {
    if (n.length === 0) {
        return 0
    }
    return maxSum(0, n.length - 1, n)
}

function maxSum(left: number, right: number, n: number[]): number {
    if (left === right) {
        return Math.max(n[left], 0)
    }
    const center = Math.floor((left + right) / 2)
    // 递归求解左半部分最大子序列和
    const maxLeftSum = maxSum(left, center, n)
    // 递归求解左半部分最大子序列和
    const maxRightSum = maxSum(center + 1, right, n)
    let leftBorderSum = 0
    let leftMaxBorderSum = 0
    // 计算中间分界处到左半部分的最大和
    for (let i = center; i >= left; i--) {
        leftBorderSum += n[i]
        if (leftBorderSum > leftMaxBorderSum) {
            leftMaxBorderSum = leftBorderSum
        }
    }
    let rightBorderSum = 0
    let maxRightBorderSum = 0
    // 计算中间分界处到右半部分的最大和
    for (let j = center + 1; j <= right; j++) {
        rightBorderSum += n[j]
        if (rightBorderSum > maxRightBorderSum) {
            maxRightBorderSum = rightBorderSum
        }
    }
    return Math.max(maxLeftSum, maxRightSum, leftMaxBorderSum + maxRightBorderSum)
}

/**
 * 最大子序列和问题之联机法
 * @param  {number[]} n
 */

export function maxSubSequenceSum3(n: number[]): number {
    let currentSum = 0
    let maxSum = 0
    for (let i = 0, j = n.length; i < j; i++) {
        currentSum += n[i]
        if (currentSum > maxSum) {
            maxSum = currentSum
        }
        if (currentSum < 0) {
            currentSum = 0
        }
    }
    return maxSum
}
