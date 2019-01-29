import AVLTree from './avl-tree';
import BinarySearchTree from './binary-search-tree';
import {
    generateExpressionTree,
    listTreePreOrder,
} from './index';

describe('tree', () => {
    test('树的先序遍历并获取深度', () => {
        const tree = {
            value: 1,
            children: [
                {
                    value: 2,
                    children: [
                        {
                            value: 5,
                            children: [
                                {
                                    value: 6,
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 3,
                    children: [
                        {
                            value: 7,
                            children: []
                        }
                    ],
                },
                {
                    value: 4,
                    children: []
                }
            ]
        }
        expect(listTreePreOrder(tree, 0)).toBe(3);
    });
    test('后缀表达式构造表达式树', () => {
        const expression = 'ab+cde+**';
        const binaryTree = generateExpressionTree(expression);
        expect(binaryTree).toMatchObject({ value: '*' });
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
        tree.traverse(BinarySearchTree.PREORDER, console.log);
    });
});
describe.only('AVL树', () => {
    test('数据的插入', () => {
        const tree = new AVLTree();
        const numbers = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14, 13, 12, 11, 10, 8, 9,];
        numbers.forEach((value) => {
            tree.insert(value);
            console.log(tree);
        });
    })
})
