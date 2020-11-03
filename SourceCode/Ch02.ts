/** @format */

// 算法1，穷举法
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

// 算法2，分治法
export function maxSubSequenceSum2(n: number[]): number {
    if (n.length === 0) {
        return 0
    }
    return maxSum(0, n.length - 1, n)
}

function maxSum(start: number, end: number, n: number[]): number {
    if (start === end) {
        return Math.max(n[start], 0)
    }
    const middle = Math.floor((start + end) / 2)
    // 递归求解左半部分最大子序列和
    const maxLeftSum = maxSum(start, middle, n)
    // 递归求解左半部分最大子序列和
    const maxRightSum = maxSum(middle + 1, end, n)
    let leftBorderSum = 0
    let leftMaxBorderSum = 0
    // 计算中间分界处到左半部分的最大和
    for (let i = middle; i >= start; i--) {
        leftBorderSum += n[i]
        if (leftBorderSum > leftMaxBorderSum) {
            leftMaxBorderSum = leftBorderSum
        }
    }
    let rightBorderSum = 0
    let maxRightBorderSum = 0
    // 计算中间分界处到右半部分的最大和
    for (let j = middle + 1; j <= end; j++) {
        rightBorderSum += n[j]
        if (rightBorderSum > maxRightBorderSum) {
            maxRightBorderSum = rightBorderSum
        }
    }
    return Math.max(maxLeftSum, maxRightSum, leftMaxBorderSum + maxRightBorderSum)
}

// 算法3，联机法
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
