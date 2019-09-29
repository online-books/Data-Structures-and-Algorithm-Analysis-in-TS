import TreeNode from './tree-node';

export function buildBinaryTree(input: Array<number | null>): TreeNode | null {
    const stack: Array<TreeNode | null> = [];
    let root: TreeNode | null = null;
    let prevNode: TreeNode | null = null;
    while (input.length) {
        const value = input.shift();
        let node: TreeNode | null = null;
        if (value !== null) {
            node = new TreeNode(value);
            if (!root) {
                root = node;
            }
        }
        if (stack.length) {
            const top = stack[0];
            if (top === null) {
                stack.shift();
                input.unshift(value || null);
            } else {
                if (prevNode !== top) {
                    top.left = node;
                    prevNode = top;
                } else {
                    top.right = node;
                    prevNode = null;
                    stack.shift();
                }
            }
        }
        stack.push(node);
    }
    return root;
}
