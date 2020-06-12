import BinaryTreeNode from "@src/data-structures/tree/binary-tree-node";

export type Matrix = number[][];
export type WordProb = { word: string; prob: number };

function getColums(m: Matrix): number {
  return m[0].length;
}

export function fib(n: number): number {
  let a = 0;
  let b = 1;
  for (let i = 0; i <= n; i++) {
    let temp = b;
    b += a;
    a = temp;
  }
  return b;
}

/**
 * 求解C(n)=(2/n)*sum(C(i),0<=i<=n-1)+n
 */
export function calculate(n: number): number {
  let sum = 0;
  function f(i: number): number {
    if (i === 0) {
      return 1;
    }
    const value = f(i - 1);
    sum += value;
    const result = (sum * 2) / i + i;
    return result;
  }
  return f(n);
}

/**
 * 矩阵相乘的最佳顺序
 * 矩阵相乘的顺序组合共有：T(N)=sum(T(i)*T(N-i),0<=i<=N-1)
 */
export function optMatrixMul(...matrices: Matrix[]): number {
  const cache: { [propName: string]: number } = {};
  const path: Matrix = [];
  function mul(start: number, end: number): number {
    if (start === end) {
      return 0;
    }
    const key = `${start}-${end}`;
    const cost = cache[key];
    if (cost) {
      return cost;
    }
    let min = -1;
    let k = start;
    const rows = matrices[start].length;
    const columnsEnd = getColums(matrices[end]);
    for (let i = 0, j = end - start; i < j; i++) {
      const columnsI = getColums(matrices[start + i]);
      const ops =
        mul(start, start + i) +
        mul(start + i + 1, end) +
        rows * columnsI * columnsEnd;
      if (min === -1 || ops < min) {
        min = ops;
        k = i;
        cache[key] = ops;
      }
    }
    path.push([start, end, k]);
    return min;
  }
  const result = mul(0, matrices.length - 1);
  return result;
}

/**
 * 最优二叉查找树
 * C(left,right)=min{C(left,i-1)+C(i+1,right)+sum(Pj)，left<=j<=right}, left<=i<=right
 */

export function optBinarySearchTree(
  words: WordProb[]
): { tree: BinaryTreeNode | null; cost: number } {
  const cache = {};
  let count = 0;
  function buildTree(
    start: number,
    end: number
  ): { tree: BinaryTreeNode | null; cost: number } {
    count += 1;
    const key = `${start}-${end}`;
    if (cache[key]) {
      return cache[key];
    }
    if (start > end) {
      return {
        tree: null,
        cost: 0,
      };
    }
    if (start === end) {
      return {
        tree: new BinaryTreeNode(words[start].word),
        cost: words[start].prob,
      };
    }
    let min = -1;
    let tree!: BinaryTreeNode;

    for (let i = 0; i <= end - start; i++) {
      const left = buildTree(start, start + i - 1);
      const right = buildTree(start + i + 1, end);
      const root = new BinaryTreeNode(words[start + i].word);
      root.left = left.tree;
      root.right = right.tree;
      const cost = left.cost + right.cost;
      if (min === -1 || min > cost) {
        min = cost;
        tree = root;
      }
    }
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += words[i].prob;
    }
    cache[key] = {
      cost: min + sum,
      tree,
    };
    return {
      cost: min + sum,
      tree,
    };
  }
  const result = buildTree(0, words.length - 1);
  return result;
}
