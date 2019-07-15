

export class TreeNode {
    public val: null | number;
    public left: null | TreeNode;
    public right: null | TreeNode;
    constructor(val: number) {
        this.val = val;
    }
}

export function inorderTraversal(treeNode: TreeNode | null, callBack?: (val: number) => void): void {

    if (!treeNode) {
        return;
    }
    inorderTraversal(treeNode.left, callBack);
    if (callBack) {
        callBack(treeNode.val!);
    }
    inorderTraversal(treeNode.right, callBack);
}
export function preorderTraversal(treeNode: TreeNode | null, callBack: (val: number) => void): void {

    if (!treeNode) {
        return;
    }
    preorderTraversal(treeNode.left, callBack);
    if (callBack) {
        callBack(treeNode.val!);
    }
    preorderTraversal(treeNode.right, callBack);
}

export function inorderTraversalIteratively(root: TreeNode): number[] {
    if (!root || !root.val) {
        return [];
    }
    const nodeArr: Array<TreeNode | number> = [root];
    const result: number[] = [];
    while (nodeArr.length) {
        const item = nodeArr.shift();
        if (typeof item === 'number') {
            result.push(item);
        } else if (typeof item === 'object') {
            if (item.right) {
                nodeArr.unshift(item.right);
            }
            nodeArr.unshift(item.val as number);
            if (item.left) {
                nodeArr.unshift(item.left);
            }
        }
    }
    return result;
}

/**
 * Binary Tree Zigzag Level Order Traversal
 * Given a binary tree, return the zigzag level order traversal of its nodes' values. 
 * (ie, from left to right, then right to left for the next level and alternate between).
 * @param root 
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


export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length || !inorder.length) {
        return null;
    }
    function getRootNode(arr: number[]): TreeNode | null {
        if (!arr.length) {
            return null;
        }
        const val = preorder.shift();
        if (val !== undefined) {
            const rootIndex: number = arr.findIndex(num => num === val);
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
 * @param root 
 * @param k 
 */
export function kthSmallest(root: TreeNode, k: number): number {
    const result: number[] = [];
    function traverse(node: TreeNode | null): void {
        if (!node) {
            return;
        }

        traverse(node.left);
        if (result.length >= k) {
            return;
        }
        result.push(node.val as number);
        traverse(node.right);
    }
    traverse(root);
    return result[k - 1];
}
