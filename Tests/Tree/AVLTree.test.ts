/** @format */

import AVLTree from '@/Tree/AVLTree/AVLTree'

describe('AVL tree', () => {
    let tree: AVLTree<number>
    test('initialization', () => {
        tree = new AVLTree()
        expect(tree.root).toBeNull()
        expect(tree).toBeInstanceOf(AVLTree)
    })
    test('insert', () => {
        const data = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14, 13, 12, 11, 10, 8, 9]
        data.forEach((value, index) => tree.insert(value, index))
        const root = tree.root!
        expect(root).not.toBeNull()
        expect(root.key).toBe(7)
        expect(root.height).toBe(4)
        expect(root.left).not.toBeNull()
        expect(root.left!.value).toBe(3)
        expect(root.left!.height).toBe(2)
        expect(root.right).not.toBeNull()
        expect(root.right!.value).toBe(10)
        expect(root.right!.height).toBe(3)
    })
    test('find', () => {
        expect(tree.find(9)).toBe(15)
        expect(tree.find(20)).toBeNull()
    })
})
