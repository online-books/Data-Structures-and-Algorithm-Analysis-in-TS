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
        redBlackTree = new RedBlackTree()
        const data = [30, 15, 10, 20, 5, 70, 60, 85, 50, 65, 40, 55, 80, 90, 1, 45, 20]
        const fn = jest.fn(value => {
            redBlackTree.insert(value, value)
        })
        data.forEach(value => fn(value))
        expect(fn).toHaveBeenCalledTimes(data.length)
    })
    test('find', () => {
        expect(redBlackTree.find(30)).toBe(30)
        expect(redBlackTree.find(40)).toBe(40)
    })
})
