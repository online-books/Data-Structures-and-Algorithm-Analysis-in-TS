import { buildBinaryTree } from '../../../data-structures/tree/index';

import {
    buildTree,
    inorderTraverse,
    kthSmallest,
    numIslands,
} from './index';


describe('medium => Tree', () => {
    test('Binary Tree Inorder Traversal', () => {
        const tree = buildBinaryTree([1, null, 2, 3])
        expect(inorderTraverse(tree)).toEqual([1, 3, 2])
    });
    test('Construct Binary Tree from Preorder and Inorder Traversal', () => {
        const tree1 = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
        const tree2 = buildTree([1, 2], [1, 2]);
        expect(inorderTraverse(tree1)).toEqual([9, 3, 15, 20, 7]);
        expect(inorderTraverse(tree2)).toEqual([1, 2]);

    });
    test('Kth Smallest Element in a BST', () => {
        const tree = buildTree([3, 1, 2, 4], [1, 2, 3, 4]);
        expect(kthSmallest(tree, 1));
    });
    test('Number of Islands', () => {
        expect(numIslands([
            ['1', '1', '1', '1', '0'],
            ['1', '1', '0', '1', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '0', '0', '0']
        ])).toBe(1);
    })
})