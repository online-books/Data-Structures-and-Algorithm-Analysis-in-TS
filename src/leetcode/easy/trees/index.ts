import TreeNode from '../../lib/binary-tree/tree-node';


/**
 *  Maximum Depth of Binary Tree
 *  Given a binary tree, find its maximum depth.
 */

export function maxDepth(root: TreeNode | null): number {
    function getDepth(node: TreeNode | null, depth: number): number {
        if (!node) {
            return depth;
        }
        return Math.max(getDepth(node.left, depth + 1), getDepth(node.right, depth + 1));
    }
    return getDepth(root, 0);
}

/**
 * Validate Binary Search Tree
 * Given a binary tree, determine if it is a valid binary search tree (BST).
 */

export function isValidBST(root: TreeNode | null): boolean {

    function helper(node: TreeNode | null, min: null | number, max: null | number): boolean {
        if (!node) {
            return true; // We hit the end of the path
        }

        if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
            return false; // current node's val doesn't satisfy the BST rules
        }

        // Continue to scan left and right
        return helper(node.left, min, node.val) && helper(node.right, node.val, max);
    }

    return helper(root, null, null);
}

/**
 * Symmetric Tree
 * Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).
 * example:
 * input:[1,2,2,3,4,4,3],[1,2,2,null,3,null,3]
 * output:true,false
 */
export function isSymmetricIteratively(root: TreeNode | null): boolean {
    if (!root) {
        return true;
    }
    const stack: Array<TreeNode | null> = [root];
    const nodes = [];
    let count = 1;
    while (stack.length) {
        const node = stack.shift();
        nodes.push(node);
        if (nodes.length === count) {
            count *= 2;
            let i = 0;
            let j = nodes.length - 1;
            while (i < j) {
                const n1 = nodes[i];
                const n2 = nodes[j];
                if (!n1) {
                    count -= 2;
                }
                if (!n2) {
                    count -= 2;
                }
                if (!n1 && !n2) {
                    i += 1;
                    j -= 1;
                    continue;
                } else if (n1 && n2 && n1.val === n2.val) {
                    i += 1;
                    j -= 1;
                    continue;
                } else {
                    return false;
                }
            }
            nodes.length = 0;
        }
        if (node) {
            stack.push(node.left);
            stack.push(node.right);
        }
    }
    return true;
}

export function isSymmetricRecursively(root: TreeNode | null): boolean {
    if (!root) {
        return true;
    }
    function helper(left: TreeNode | null, right: TreeNode | null): boolean {
        if (!left || !right) {
            return left === right;
        }
        if (left.val !== right.val) {
            return false;
        }
        return helper(left.left, right.right) && helper(left.right, right.left);
    }
    return helper(root.left, root.right);
}

/**
 * 
 * Binary Tree Level Order Traversal
 * Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).
 * Example:
 * input: [3,9,20,null,null,15,7]
 * output:[[3],[9,20],[15,7]]
 */
export function levelOrder(root: TreeNode | null): any[][] {
    if (!root) {
        return [];
    }
    const result: any[][] = [];
    function helper(node: TreeNode | null, index: number): void {
        if (!node) {
            return;
        }
        if (!result[index]) {
            result[index] = [];
        }
        result[index].push(node.val);
        helper(node.left, index + 1);
        helper(node.right, index + 1);
    }
    helper(root, 0);
    return result;
}

/**
 * Convert Sorted Array to Binary Search Tree
 * Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
 */

export function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (!nums.length) {
        return null;
    }
    function helper(start: number, end: number): TreeNode | null {
        if (start === end) {
            return null;
        }
        const middle = Math.floor((end + start) / 2);
        const value = nums[middle];
        const node = new TreeNode(value);
        node.left = helper(start, middle);
        node.right = helper(middle + 1, end);
        return node;
    }
    return helper(0, nums.length);
}