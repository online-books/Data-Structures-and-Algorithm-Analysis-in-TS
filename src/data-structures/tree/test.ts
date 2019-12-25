import AVLTree from './avl-tree';
import BinarySearchTree from './binary-search-tree';
import {
    generateExpressionTree,
} from './index';

describe('tree', () => {
    test('后缀表达式构造表达式树', () => {
        const expression = '12+345+**';
        const binaryTree = generateExpressionTree(expression);
        expect(binaryTree.val).toBe('*');
    });
});
describe('二叉查找树', () => {
    const values = [8, 5, 12, 3, 7, 9, 14, 1, 4, 6, 13, 15];
    const tree = new BinarySearchTree();
    values.forEach(value => tree.insert(value));
    test('查找最大值', () => {
        const max = tree.findMax();
        expect(max).toBe(15);

    });
    test('查找最小值', () => {
        const min = tree.findMin();
        expect(min).toBe(1);
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
        expect(tree.findMax()).toBe(17);
    });
});
describe('AVL树', () => {
    test('数据的插入', () => {
        const tree = new AVLTree();
        const numbers = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14, 13, 12, 11, 10, 8, 9,];
        numbers.forEach((value) => {
            tree.insert(value);
        });
        expect(tree.height).toBe(4);
    });
})
