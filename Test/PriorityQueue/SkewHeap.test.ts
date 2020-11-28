/** @format */

import SkewHeap from '@/priority-queue/SkewHeap'

describe('Skrew Heap', () => {
    let skewHeap: SkewHeap<number>
    test('initialization', () => {
        skewHeap = new SkewHeap()
        expect(skewHeap).toBeInstanceOf(SkewHeap)
        expect(skewHeap.size).toBe(0)
        expect(skewHeap.getMin()).toBeNull()
    })
    test('insert', () => {
        const data = [6, 3, 9, 10, 13]
        data.forEach(val => skewHeap.insert(val))
        expect(skewHeap.size).toBe(5)
    })
    test('getMin', () => {
        expect(skewHeap.getMin()).toBe(3)
    })
    test('deleteMin', () => {
        skewHeap.deleteMin()
        expect(skewHeap.root!.element).toBe(6)
        expect(skewHeap.size).toBe(4)
    })
    test('merge', () => {
        const skewHeap1 = new SkewHeap<number>()
        const skewHeap2 = new SkewHeap<number>()
        skewHeap.merge(skewHeap1)
        expect(skewHeap.size).toBe(4)
        const data = [8, 12]
        data.forEach(val => skewHeap2.insert(val))
        skewHeap.merge(skewHeap2)
        expect(skewHeap.size).toBe(6)
        expect(skewHeap.getMin()).toBe(6)
    })
})
