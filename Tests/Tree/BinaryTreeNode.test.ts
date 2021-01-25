/** @format */

import BinaryTreeNode from '@/Tree/BinarySearchTree/BinaryTreeNode'

describe('Binary tree node', () => {
    test('', () => {
        const node1 = new BinaryTreeNode(1, 'node1')
        const node2 = new BinaryTreeNode(2, 'node2')
        expect(node2 > node1).toBeTruthy()
    })
})
