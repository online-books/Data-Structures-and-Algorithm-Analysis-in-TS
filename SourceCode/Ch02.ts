// 算法1，穷举法
export function maxSubSequenceSum1(n: number[]): number {
    const { length } = n
    let currentSum = 0;
    let maxSum = 0;
    for (let i = 0; i < length; i++) {
        currentSum = 0
        for (let j = i; j < length; j++) {
            currentSum += n[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
    }
    return maxSum
}

// 算法2，分治法
export function maxSubSequenceSum2(n: number[]): number {
    if (n.length === 0) {
        return 0;
    }
    return maxSum(0, n.length - 1, n)
}

function maxSum(start: number, end: number, n: number[]): number {
    if (start === end) {
        return Math.max(n[start], 0)
    }
    const middle = Math.ceil((start + end) / 2)
    const leftMaxSum = maxSum(start, middle, n);
    const rightMaxSum = maxSum(middle + 1, end, n);
    let leftBorderSum = 0;
    let rightBorderSum = 0;
    let leftMaxBorderSum = 0;
    let rightmaxBorderSum = 0;
    for (let i = middle; i >= start; i--) {
        leftBorderSum += n[i];
        if (leftBorderSum > leftMaxBorderSum) {
            leftMaxBorderSum = leftBorderSum
        }
    }
    for (let j = middle + 1; j <= end; j++) {
        rightBorderSum += n[j]
        if (rightBorderSum > rightmaxBorderSum) {
            rightmaxBorderSum = rightBorderSum
        }
    }
    return Math.max(leftMaxSum, rightMaxSum, leftBorderSum + rightBorderSum)
}