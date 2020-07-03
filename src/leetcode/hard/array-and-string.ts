import { compare } from '@src/share/utils';

/**
 * Product of Array Except Self
 * Given an array nums of n integers where n > 1,
 * return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
 * Note: Please solve it without division and in O(n).
 */

export function productExceptSelf(nums: number[]): number[] {
    let zeroCount = 0;
    const totalProduct = nums.reduce((a, b) => {
        if (b === 0) {
            zeroCount += 1;
            return a;
        }
        return a * b;
    }, 1);
    if (zeroCount > 1) {
        nums.forEach((num, index) => {
            nums[index] = 0;
        });
    } else if (zeroCount === 1) {
        nums.forEach((num, index) => {
            if (num) {
                nums[index] = 0;
            } else {
                nums[index] = totalProduct;
            }
        });
    } else {
        nums.forEach((num, index) => {
            nums[index] = totalProduct / num;
        });
    }
    return nums;
}

/**
 * Spiral Matrix
 * Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.
 */

export function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];
    const {
        length,
    } = matrix;
    if (!length) {
        return result;
    }

    function helper(top: number, bottom: number, left: number, right: number): void {
        if (top > bottom && left > right) {
            return;
        }
        const arr = [];
        if (top <= bottom) {
            arr.push(...matrix[top].slice(left, right + 1)); // 上边
        }
        if (left <= right) {
            for (let i = top + 1; i < bottom; i++) { // 右边
                arr.push(matrix[i][right]);
            }
        }
        if (top < bottom) {
            arr.push(...matrix[bottom].slice(left, right + 1).reverse()); // 下边
        }
        if (left < right) {
            for (let i = bottom - 1; i > top; i--) { // 左边
                arr.push(matrix[i][left]);
            }
        }
        result.push(...arr);
        helper(top + 1, bottom - 1, left + 1, right - 1);
    }
    helper(0, length - 1, 0, matrix[0].length - 1);
    return result;
}


/**
 * 4Sum II
 * Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.
 * To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500.
 * time:O(N^3) space:(O(0))
 */

export function fourSumCount(A: number[], B: number[], C: number[], D: number[]): number {
    A = A.sort(compare);
    B = B.sort(compare);
    C = C.sort(compare);
    D = D.sort(compare);
    const {
        length
    } = A;
    const end = length - 1;
    const lastA = A[end];
    const lastB = B[end];
    const lastC = C[end];
    const lastD = D[end];
    let count = 0;
    if (lastA + lastB + lastC + lastD < 0) {
        return count;
    }
    for (let i = end; i >= 0; i--) {
        const threeSum = 0 - A[i];
        if (lastB + lastC + lastD < -threeSum) {
            continue;
        }
        for (let j = end; j >= 0; j--) {
            const twoSum = threeSum - B[j];
            let m = end;
            let n = 0;
            while (m >= 0 && n <= end) {
                const valC = C[m];
                const valD = D[n];
                const sum = valC + valD;
                if (sum === twoSum) {
                    let num1 = 1;
                    while (valD === D[n + 1] && n < end) {
                        n += 1;
                        num1 += 1;
                    }
                    let num2 = 1;
                    while (valC === C[m - 1] && m > 0) {
                        m -= 1;
                        num2 += 1;
                    }
                    count += num1 * num2;
                    m -= 1;
                    n += 1;
                } else if (sum > twoSum) {
                    m -= 1;
                } else {
                    n += 1;
                }
            }
        }
    }
    return count;
};

export function fourSumCountFaster(A: number[], B: number[], C: number[], D: number[]): number {
    let result = 0;
    const {
        length,
    } = A;
    const map = {};
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            const sum = A[i] + B[j];
            const val = map[sum];
            map[sum] = val ? val + 1 : 1;
        }
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            const sum = C[i] + D[j];
            const val = map[-sum];
            if (val) {
                result += val;
            }
        }
    }
    return result;
}

/**
 * Container With Most Water
 * Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai).
 * n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
 * Find two lines, which together with x-axis forms a container, such that the container contains the most water.
 */

export function maxArea(height: number[]): number {
    const {
        length
    } = height;
    let result = 0;
    let i = 0;
    let j = length - 1;
    while (i < j) {
        result = Math.max(result, Math.min(height[i], height[j]) * (j - i));
        if (height[i] < height[j]) {
            i++;
        } else {
            j--;
        }
    }
    return result;
};

/**
 * Game of Life
 * Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):
 * 1.Any live cell with fewer than two live neighbors dies, as if caused by under-population.
 * 2.Any live cell with two or three live neighbors lives on to the next generation.
 * 3.Any live cell with more than three live neighbors dies, as if by over-population..
 * 4.Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 * Write a function to compute the next state (after one update) of the board given its current state. 
 * The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously.
 */

export function gameOfLife(board: number[][]): void {
    const row = board.length;
    if (!row) {
        return;
    }
    const columns = board[0].length;
    function isLive(m: number, n: number) {
        const val = board[m][n];
        let count = 0;
        for (let i = m - 1; i <= m + 1; i++) {
            for (let j = n - 1; j <= n + 1; j++) {
                if (i === m && j === n) {
                    continue;
                }
                const neighbor = getVal(i, j);
                if (neighbor === -1 || neighbor === 1) {
                    count += 1;
                }
            }
        }
        if (val) {
            if (count <= 1) {
                board[m][n] = -1;
            } else if (count > 3) {
                board[m][n] = -1;
            }
        } else {
            if (count === 3) {
                board[m][n] = 2;
            }
        }

    }
    function getVal(m: number, n: number) {
        if (m < 0 || n < 0 || m >= row || n >= columns) {
            return 0;
        }
        return board[m][n];
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < columns; j++) {
            isLive(i, j);
        }
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < columns; j++) {
            const val = getVal(i, j);
            if (val === -1) {
                board[i][j] = 0;
            }
            if (val === 2) {
                board[i][j] = 1;
            }
        }
    }
}

/**
 * First Missing Positive
 * Given an unsorted integer array, find the smallest missing positive integer.
 * Your algorithm should run in O(n) time and uses constant extra space.
 */
export function firstMissingPositive(nums: number[]): number {
    const {
        length,
    } = nums;
    let i = 0;
    while (i < length) {
        const val = nums[i];
        if (val > 0 && val <= length && val !== nums[val - 1]) {
            [nums[val - 1], nums[i]] = [nums[i], nums[val - 1]];
        } else {
            i++;
        }
    }
    for (i = 0; i < length; i++) {
        const val = nums[i];
        if (val !== i + 1) {
            return i + 1;
        }
    }
    return i + 1;
}

/**
 * Longest Consecutive Sequence
 * Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
 * Your algorithm should run in O(n) complexity.
 */

export function longestConsecutive(nums: number[]): number {
    const cache = {};
    const {
        length
    } = nums;
    if (!length) {
        return 0;
    }
    nums.forEach(num => cache[num] = 0);
    let max = 1;
    for (let i = 0; i < length; i++) {
        let count = 0;
        let n = nums[i];
        while (cache[n] === 0) {
            cache[n] = 1;
            count += 1;
            n = n - 1;
        }
        const val = count + (cache[n] || 0);
        cache[nums[i]] = val;
        if (max < val) {
            max = val;
        }
    }
    return max;
}
