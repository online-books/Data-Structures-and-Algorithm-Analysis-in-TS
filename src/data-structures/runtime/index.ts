/**
 * 最大子序列和问题
 * 运行时间：O(NlogN)
 */

export function maxSubSumByNlogN(
  A: number[],
  start: number,
  end: number
): number {
  if (start === end) {
    if (A[start] < 0) {
      return 0;
    }
    return A[start];
  }
  const middle = Math.floor((start + end) / 2);
  const maxLeftNumber = maxSubSumByNlogN(A, start, middle);
  const maxRightNumber = maxSubSumByNlogN(A, middle + 1, end);
  let leftBorderSum = 0;
  let maxLeftBorderSum = 0;
  for (let i = middle; i >= start; i--) {
    leftBorderSum += A[i];
    if (leftBorderSum > maxLeftBorderSum) {
      maxLeftBorderSum = leftBorderSum;
    }
  }
  let rightBorderSum = 0;
  let maxRightBorderSum = 0;
  for (let i = middle + 1; i <= end; i++) {
    rightBorderSum += A[i];
    if (rightBorderSum > maxRightBorderSum) {
      maxRightBorderSum = rightBorderSum;
    }
  }
  const maxSum = Math.max(
    maxLeftNumber,
    maxRightNumber,
    maxLeftBorderSum + maxRightBorderSum
  );
  return maxSum;
}

/**
 * 最大子序列和问题
 * 运行时间：O(N)
 */
export function maxSubSumByN(A: number[]): number {
  let maxSubSum = 0;
  let currentSum = 0;
  for (let i = 0; i < A.length; i++) {
    currentSum += A[i];
    if (currentSum < 0) {
      currentSum = 0;
    }
    if (currentSum > maxSubSum) {
      maxSubSum = currentSum;
    }
  }

  return maxSubSum;
}

/**
 * 对已排序的数组进行对分查找
 * 运行时间：O(logN)
 */

export function binarySearch(A: number[], n: number) {
  let left = 0;
  let right = A.length - 1;
  while (right >= left) {
    const middle = Math.floor((right + left) / 2);
    if (A[middle] > n) {
      right = middle - 1;
    } else if (A[middle] === n) {
      return middle;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}

/**
 * 欧几里德算法求解最大公因数
 * 运行时间：O(logN)
 */

export function maxCommonFactor(m: number, n: number): number {
  if (m < n) {
    [m, n] = [n, m];
  }
  while (n > 0) {
    const rem = m % n;
    m = n;
    n = rem;
  }
  return m;
}

/**
 * 求幂运算之递归实现
 */

export function powByRecursive(x: number, n: number): number {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return x;
  }

  if (n % 2) {
    return powByRecursive(x * x, (n - 1) / 2) * x;
  } else {
    return powByRecursive(x * x, n / 2);
  }
}

export function pow(x: number, n: number): number {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return x;
  }
  let temp = 1;
  while (n > 1) {
    if (n % 2) {
      temp = temp * x;
      n = n - 1;
    } else {
      x = x * x;
      n = n / 2;
    }
  }
  return temp * x;
}
