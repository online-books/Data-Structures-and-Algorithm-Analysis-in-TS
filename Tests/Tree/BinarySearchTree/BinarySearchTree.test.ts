/** @format */

import BinarySearchTree from '@/Tree/BinarySearchTree/BinarySearchTree'

describe('binary search tree', () => {
    let tree: BinarySearchTree<number>
    test('bst initialization', () => {
        tree = new BinarySearchTree<number>()
        expect(tree).toBeInstanceOf(BinarySearchTree)
        expect(tree.root).toBeNull()
    })
    test('bst insert', () => {
        const data = [6, 2, 1, 4, 3, 8, 2]
        data.forEach(value => tree.insert(value))
        expect(tree.root).not.toBeNull()
        expect(tree.root!.element).toBe(6)
        const maxNode = tree.findMax()
        expect(maxNode).not.toBeNull()
        expect(maxNode!.element).toBe(8)
        const minNode = tree.findMin()
        expect(minNode).not.toBeNull()
        expect(minNode!.element).toBe(1)
    })
    test('bst find', () => {
        expect(tree.find(5)).toBeNull()
        const node1 = tree.find(2)
        expect(node1).not.toBeNull()
        expect(node1!.left!.element).toBe(1)
        expect(node1!.right!.element).toBe(4)
        const node2 = tree.find(3)
        expect(node2).not.toBeNull()
        expect(node2!.left).toBeNull()
        expect(node2!.right).toBeNull()
    })
    test('bst delete', () => {
        tree.delete(1)
        expect(tree.find(1)).toBeNull()
        tree.delete(4)
        expect(tree.root!.left!.right!.element).toBe(3)
        expect(tree.root!.left!.left).toBeNull()
        tree.delete(2)
        expect(tree.root!.left!.element).toBe(3)
        tree.delete(tree.root!.element)
        expect(tree.root!.element).toBe(8)
        tree.delete(5)
    })
})
