import {
    buildTree,
    inorderTraversal,
    kthSmallest,
    TreeNode,
} from './index';


describe.only('trees', () => {

    test('Construct Binary Tree from Preorder and Inorder Traversal', () => {
        const result: number[] = [];
        const preorder = [3, 9, 10, 14, 13, 18, 12, 11, 20, 15, 6, 5, 7, 4, 2];
        const inorder = [14, 10, 13, 9, 12, 18, 11, 3, 6, 15, 5, 20, 4, 7, 2];
        const tree = buildTree(preorder, inorder);
        inorderTraversal(tree, (val) => {
            result.push(val);
        });
        expect(result).toEqual(inorder);
    });
    test.only('Kth Smallest Element in a BST', () => {
        const tree = buildTree([3, 1, 2, 4], [1, 2, 3, 4]);
        const result = kthSmallest(tree as TreeNode, 1);
        console.log(result);
    })
})