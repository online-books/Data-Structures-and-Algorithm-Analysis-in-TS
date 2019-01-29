/**
 * 树
 */

import BinaryTreeNode from './binary-tree-node';

interface ITree {
    value: any;
    children: ITree[];
}
/**
 * 先序遍历树
 */
export function listTreePreOrder (tree: ITree, depth: number): number {
    let result = depth;
    if (tree.children.length) {
        tree.children.forEach((node) => {
            const a = listTreePreOrder(node, depth + 1);
            if (result < a) {
                result = a;
            }
        });
    }
    return result;
}


/**
 * 后缀表达式构造表达式树
 */

export function generateExpressionTree (postfixExpression: string) {
    const reg = /[*-+\/]/;
    const nodesStack: BinaryTreeNode[] = [];
    for (let i = 0; i < postfixExpression.length; i++) {
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
    return nodesStack.shift();
}