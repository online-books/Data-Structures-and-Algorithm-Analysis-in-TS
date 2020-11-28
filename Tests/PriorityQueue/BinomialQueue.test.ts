/** @format */

import BinomialQueue from '@/PriorityQueue/BinomialQueue/BinomialQueue'

describe('Binomial Queue', () => {
    const binQueue = new BinomialQueue<number>()
    test('initialization', () => {
        expect(binQueue).toBeInstanceOf(BinomialQueue)
        expect(binQueue.size).toBe(0)
        expect(binQueue.deleteMin()).toBe(null)
        expect(binQueue.getMin()).toBe(null)
    })
    test('insert', () => {
        const data = [1, 2, 3, 4, 5, 6, 7]
        data.forEach(val => binQueue.insert(val))
        expect(binQueue.size).toBe(7)
    })
    test('findMin', () => {
        expect(binQueue.getMin()).toBe(1)
    })
    test('deleteMin', () => {
        expect(binQueue.deleteMin()).toBe(1)
        expect(binQueue.size).toBe(6)
        expect(binQueue.deleteMin()).toBe(2)
        expect(binQueue.size).toBe(5)
    })
    test('merge', () => {
        const binQueue1 = new BinomialQueue<number>()
        const binQueue2 = new BinomialQueue<number>()
        const data1 = [14, 65, 42]
        const data2 = [12, 16, 26, 18, 30]
        data1.forEach(val => binQueue1.insert(val))
        data2.forEach(val => binQueue2.insert(val))
        binQueue1.merge(binQueue2)
        expect(binQueue1.size).toBe(8)
        expect(binQueue1.getMin()).toBe(12)
        expect(binQueue2.size).toBe(0)
        expect(binQueue2.getMin()).toBeNull()
    })
})
