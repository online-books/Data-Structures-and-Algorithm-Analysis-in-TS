import AVLTree from './avl-tree';
import BinarySearchTree from './binary-search-tree';

import {
    generateExpressionTree,
} from './index';

it('后缀表达式构造表达式树', () => {
    const expression = '12+345+**';
    const binaryTree = generateExpressionTree(expression);
    expect(binaryTree.val).toBe('*');
});
describe('二叉查找树', () => {
    const data = [8, 5, 12, 13, 15];
    const tree = new BinarySearchTree();
    data.forEach(value => tree.insert(value));
    test('查找最大值', () => {
        const max = tree.findMax();
        expect(max).toBe(15);
    });
    test('查找最小值', () => {
        const min = tree.findMin();
        expect(min).toBe(5);
    });
    test('获取高度', () => {
        expect(tree.height).toBe(3);
        tree.insert(16);
        tree.insert(17);
        expect(tree.height).toBe(5);
    })
    test('删除元素', () => {
        tree.delete(15);
        tree.delete(5);
        expect(tree.find(8)!.left).toBe(null);
    });
});
describe('AVL树', () => {
    const tree = new AVLTree();
    const data = [3, 2, 11, 10, 8, 9];
    data.forEach(value => tree.insert(value));
    test('构建', () => {
        const root = tree.getRoot();
        expect(root!.val).toBe(8);
    })
    test('查找最小值', () => {
        expect(tree.findMin()).toBe(2);
    });
    test('查找最大值', () => {
        expect(tree.findMax()).toBe(11);
    });
    test('获取高度', () => {
        expect(tree.height).toBe(2);
    });
});

// describe.skip('伸展树', () => {
//     const tree = new SplayTree();
//     const data = [7, 6, 5, 4, 3, 2, 1];
//     data.forEach(value => tree.insert(value));
//     test('获取高度', () => {
//         expect(tree.height).toBe(6);
//     });
//     test('查找元素', () => {
//         tree.find(1);
//         expect(tree.getRoot()!.val).toBe(1);
//         expect(tree.height).toBe(4);
//         tree.find(2);
//         expect(tree.getRoot()!.val).toBe(2);
//         expect(tree.height).toBe(4);
//         expect(tree.getRoot()!.left!.val).toBe(1);
//     })
// });

