/** @format */

import BinarySearchTree from '@/Tree/BinarySearchTree/BinarySearchTree'

describe('binary search tree', () => {
    let tree: BinarySearchTree<number>
    test('bst initialization', () => {
        tree = new BinarySearchTree<number>()
        expect(tree).toBeInstanceOf(BinarySearchTree)
        expect(tree.min()).toBeNull()
        expect(tree.max()).toBeNull()
        expect(tree.size).toBe(0)
    })
    test('bst insert', () => {
        const data = [6, 2, 1, 4, 3, 8, 2]
        data.forEach((key, value) => tree.insert(key, value))
        expect(tree.root!.key).toBe(6)
        expect(tree.root!.value).toBe(0)
        const maxValue = tree.max()
        expect(maxValue).toBe(5)
        const minValue = tree.min()
        expect(minValue).toBe(2)
        expect(tree.size).toBe(6)
    })
    test('bst find', () => {
        expect(tree.find(5)).toBeNull()
        expect(tree.find(6)).toBe(0)
    })
    test('bst delete', () => {
        tree.delete(7)
        expect(tree.size).toBe(6)
        tree.delete(1)
        expect(tree.find(1)).toBeNull()
        expect(tree.min()).toBe(6)
        tree.delete(2)
        expect(tree.min()).toBe(4)
        tree.delete(4)
        expect(tree.min()).toBe(4)
        tree.delete(6)
        expect(tree.size).toBe(2)
        expect(tree.root!.key).toBe(8)
    })
})
