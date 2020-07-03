import TreeNode from "@src/data-structures/tree/binary-search-tree/binary-tree-node";

/**
 * Binary Tree Inorder Traversal
 * Given a binary tree, return the inorder traversal of its nodes' values.do it iteratively.
 */

export function inorderTraverse(root: TreeNode | null): any[] {
  if (!root) {
    return [];
  }
  const result: any[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const node = stack.shift();
    if (node instanceof TreeNode) {
      if (node.right) {
        stack.unshift(node.right);
      }
      stack.unshift(node.val);
      if (node.left) {
        stack.unshift(node.left);
      }
    } else if (typeof node === "number") {
      result.push(node);
    }
  }
  return result;
}

/**
 * Binary Tree Zigzag Level Order Traversal
 * Given a binary tree, return the zigzag level order traversal of its nodes' values.
 * (ie, from left to right, then right to left for the next level and alternate between).
 */
export function zigzagLevelOrder(root: TreeNode): number[][] {
  const cache: { [propName: string]: number[] } = {};
  function recursiveTraverse(node: TreeNode | null, deep: number): void {
    if (!node) {
      return;
    }
    if (!cache[deep]) {
      cache[deep] = [];
    }
    if (node.val !== null) {
      if (deep % 2) {
        cache[deep].unshift(node.val);
      } else {
        cache[deep].push(node.val);
      }
    }
    recursiveTraverse(node.left, deep + 1);
    recursiveTraverse(node.right, deep + 1);
  }
  recursiveTraverse(root, 0);
  return Object.values(cache);
}

/**
 * Construct Binary Tree from Preorder and Inorder Traversal
 * Given preorder and inorder traversal of a tree, construct the binary tree.
 */

export function buildTree(
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  function getRootNode(arr: number[]) {
    if (!arr.length) {
      return null;
    }
    const val = preorder.shift();
    if (val !== undefined) {
      const rootIndex = arr.findIndex((num) => num === val);
      const node = new TreeNode(val);
      if (arr.length > 1) {
        node.left = getRootNode(arr.slice(0, rootIndex));
        node.right = getRootNode(arr.slice(rootIndex + 1));
      }
      return node;
    }
    return null;
  }
  return getRootNode(inorder);
}

/**
 * Kth Smallest Element in a BST
 * Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.
 *
 */
export function kthSmallest(root: TreeNode | null, k: number): number {
  if (!root) {
    return -1;
  }
  let count = 0;
  const stack = [root];
  while (stack.length) {
    const node = stack.shift();
    if (node !== undefined) {
      if (node instanceof TreeNode) {
        if (node.right) {
          stack.unshift(node.right);
        }
        stack.unshift(node.val);
        if (node.left) {
          stack.unshift(node.left);
        }
      } else if (typeof node === "number") {
        count += 1;
        if (count === k) {
          return node;
        }
      }
    }
  }
  return -1;
}

/**
 * Number of Islands
 * Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 */
export function numIslands(grid: string[][]): number {
  const row = grid.length;
  if (!row) {
    return 0;
  }
  const column = grid[0].length;
  if (!column) {
    return 0;
  }
  function DFSMarking(i: number, j: number): void {
    if (i < 0 || j < 0 || i >= row || j >= column || grid[i][j] === "0") {
      return;
    }
    grid[i][j] = "0";
    DFSMarking(i - 1, j);
    DFSMarking(i + 1, j);
    DFSMarking(i, j - 1);
    DFSMarking(i, j + 1);
  }
  let count = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (grid[i][j] === "1") {
        DFSMarking(i, j);
        count += 1;
      }
    }
  }
  return count;
}
