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
        data.forEach(value => tree.insert(value))
        const root = tree.root!
        expect(root).not.toBeNull()
        expect(root.element).toBe(7)
        expect(root.height).toBe(4)
        expect(root.left).not.toBeNull()
        expect(root.left!.element).toBe(4)
        expect(root.left!.height).toBe(2)
        expect(root.right).not.toBeNull()
        expect(root.right!.element).toBe(13)
        expect(root.right!.height).toBe(3)
    })
    test('find', () => {
        const node = tree.find(9)
        expect(node).not.toBeNull()
        expect(node!.height).toBe(1)
        expect(node!.left!.element).toBe(8)
        expect(node!.right!.element).toBe(10)
        expect(tree.find(20)).toBeNull()
    })
})
