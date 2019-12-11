import {
    buildBinaryTree,
} from '../../../data-structures/tree/index';

import { isSymmetricIteratively, isSymmetricRecursively, isValidBST, levelOrder, maxDepth, sortedArrayToBST } from './index';

describe('easy => Trees', () => {
    test('Maximum Depth of Binary Tree', () => {
        const tree = buildBinaryTree([3, 9, 20, null, null, 15, 7]);
        expect(maxDepth(tree)).toBe(3);
    });
    test('Validate Binary Search Tree', () => {
        const tree = buildBinaryTree([10, 9, 20, null, 15]);
        expect(isValidBST(tree)).toBeFalsy();
    });
    test('Symmetric Tree', () => {
        const tree1 = buildBinaryTree([1, 2, 2, 3, 4, 4, 3]);
        expect(isSymmetricIteratively(tree1)).toBeTruthy();
        expect(isSymmetricRecursively(tree1)).toBeTruthy();
        const tree2 = buildBinaryTree([1, 2, 2, null, 3, null, 3]);
        expect(isSymmetricIteratively(tree2)).toBeFalsy();
        expect(isSymmetricRecursively(tree2)).toBeFalsy();
        const tree3 = buildBinaryTree([3, 4, 4, 5, null, null, 5, 6, null, null, 6]);
        expect(isSymmetricIteratively(tree3)).toBeTruthy();
        expect(isSymmetricRecursively(tree3)).toBeTruthy();
        const tree4 = buildBinaryTree([1, 2, 2, 2, null, 2]);
        expect(isSymmetricIteratively(tree4)).toBeFalsy();
        expect(isSymmetricRecursively(tree4)).toBeFalsy();
    });
    test('Binary Tree Level Order Traversal', () => {
        const tree = buildBinaryTree([1, 2, 2, null, 3, null, 3]);
        expect(levelOrder(tree)).toEqual([
            [1], [2, 2], [3, 3]
        ])
    });
    test('Convert Sorted Array to Binary Search Tree', () => {
        const tree = sortedArrayToBST([1, 2, 3, 4, 5, 6]);
        expect(maxDepth(tree)).toBe(3);
    });
})
