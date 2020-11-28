/** @format */

import BinaryHeap from '@/PriorityQueue/BinaryHeap'

describe('binary heap', () => {
    const data = [15, 17, 13, 9, 16, 14, 10]
    test('initialization with no data', () => {
        const binaryHeap = new BinaryHeap()
        expect(binaryHeap.size).toBe(0)
        expect(() => {
            binaryHeap.deleteMin()
        }).toThrowError(Error)
        expect(() => {
            binaryHeap.getMin()
        }).toThrowError(Error)
        data.forEach(element => binaryHeap.insert(element))
        expect(binaryHeap.getMin()).toBe(9)
        expect(binaryHeap.deleteMin()).toBe(9)
        expect(binaryHeap.getMin()).toBe(10)
    })
    test('initialization with data', () => {
        const data = [15, 17, 13, 9, 16, 14, 10]
        const binaryHeap = new BinaryHeap(data)
        expect(binaryHeap.size).toBe(data.length)
        expect(binaryHeap.getMin()).toBe(9)
        expect(binaryHeap.deleteMin()).toBe(9)
        expect(binaryHeap.getMin()).toBe(10)
    })
})
