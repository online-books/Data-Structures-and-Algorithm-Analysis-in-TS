/** @format */

import RedBlackTree from '@/Tree/RedBlackTree/RedBlackTree'

describe('Red Black Tree', () => {
    let redBlackTree: RedBlackTree<number>
    test('initialization', () => {
        redBlackTree = new RedBlackTree()
        expect(redBlackTree).toBeInstanceOf(RedBlackTree)
        expect(redBlackTree.find(1)).toBe(null)
    })
    test('insertion', () => {
        redBlackTree.insert(30, 30)
        redBlackTree.insert(15, 15)
        redBlackTree.insert(70, 70)
        redBlackTree.insert(60, 60)
        redBlackTree.insert(85, 85)
        redBlackTree.insert(80, 80)
        redBlackTree.insert(90, 90)
        redBlackTree.insert(50, 50)
        redBlackTree.insert(65, 65)
        redBlackTree.insert(40, 40)
        redBlackTree.insert(55, 55)
        redBlackTree.insert(20, 20)
        redBlackTree.insert(15, 15)
        redBlackTree.insert(10, 10)
        redBlackTree.insert(5, 5)
    })
})
