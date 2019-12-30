import BinaryTreeNode from './binary-tree-node';

/**
 * 后缀表达式构造表达式树
 */

export function generateExpressionTree(postfixExpression: string): BinaryTreeNode {
    const reg = /[*-+\/]/;
    const nodesStack: BinaryTreeNode[] = [];
    const {
        length
    } = postfixExpression;
    for (let i = 0; i < length; i++) {
        const value = postfixExpression[i];
        const node = new BinaryTreeNode(value);
        if (reg.test(value)) {
            if (nodesStack.length < 2) {
                throw Error('表达式错误');
            }
            const node1 = nodesStack.shift() as BinaryTreeNode;
            const node2 = nodesStack.shift() as BinaryTreeNode;
            node.left = node2;
            node.right = node1;
        }
        nodesStack.unshift(node);
    }
    return nodesStack.shift() || new BinaryTreeNode('');
}

export function buildBinaryTree(input: Array<number | null>): BinaryTreeNode | null {
    const stack: Array<BinaryTreeNode | null> = [];
    let root: BinaryTreeNode | null = null;
    let prevNode: BinaryTreeNode | null = null;
    while (input.length) {
        const value = input.shift();
        let node: BinaryTreeNode | null = null;
        if (value !== null) {
            node = new BinaryTreeNode(value);
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