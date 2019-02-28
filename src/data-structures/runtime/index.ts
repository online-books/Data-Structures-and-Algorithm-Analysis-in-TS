
/**
 * 最大子序列和问题
 */

export function maxSubSumByNlogN (A: number[], start: number, end: number): number {
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
    const maxSum = Math.max(maxLeftNumber, maxRightNumber, maxLeftBorderSum + maxRightBorderSum);
    return maxSum;
}

export function maxSubSumByN (A: number[]): number {
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
 */

export function binarySeatch (A: number[], n: number) {
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
 */

export function maxCommonFactor (m: number, n: number): number {
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

export function powByRecursive (x: number, n: number): number {
    if (n === 0) {
        return 1;
    }
    if (n % 2) {
        return powByRecursive(x * x, (n - 1) / 2) * x;
    } else {
        return powByRecursive(x * x, n / 2);
    }
}

export function pow (x: number, n: number): number {
    if (n === 0) {
        return 1;
    }
    if (n === 1) {
        return x;
    }
    let result = x;
    while (n >= 1) {
        if (n % 2) {
            result = result * result * x;
            n = (n - 1) / 2;
        } else {
            result = result * result;
            n = n / 2;
        }
    }
    return result;
}

/**
 * 深度搜索优先遍历DOM之递归实现
 * @param node 
 */
export function deepFirstSearchTraversesDOMByRecursive (node: Element) {
    const children = node.children;
    console.log(node);
    if (children.length) {
        Array.from(children).forEach(deepFirstSearchTraversesDOMByRecursive);
    }
}

/**
 * 深度搜索优先遍历DOM之非递归实现
 * @param node
 */
export function deepFirstSearchTraversesDOM (node: Element) {
    let parentNode: Element | null = node;
    let currentNode: Element | null = node;
    while (currentNode) {
        console.log(currentNode);
        if (currentNode.firstElementChild) {
            parentNode = currentNode;
            currentNode = currentNode.firstElementChild;
        } else {
            if (currentNode.nextElementSibling) {
                currentNode = currentNode.nextElementSibling;
            } else {
                while (parentNode && !parentNode.nextElementSibling) {
                    if (parentNode.parentElement === node) {
                        return;
                    }
                    parentNode = parentNode.parentElement;
                }
                if (!parentNode) {
                    return;
                }
                currentNode = parentNode.nextElementSibling;
            }
        }
    }
}

/**
 * 广度搜索优先遍历DOM之递归实现
 * @param node
 */
export function breadFirstSearchTraversesDOMByRecursive (root: Element) {
    const nodesArr: Element[][] = [];
    insertNode(root, 0);
    function insertNode (node: Element, depth: number) {
        const children = node.children;
        if (children.length) {
            Array.from(children).forEach(item => {
                if (!nodesArr[depth]) {
                    nodesArr[depth] = [];
                }
                nodesArr[depth].push(item);
                insertNode(item, depth + 1);
            });
        }
    }
    while (nodesArr.length) {
        const nodes = nodesArr.shift() as Element[];
        while (nodes.length) {
            console.log(nodes.shift());
        }
    }
}