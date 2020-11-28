/** @format */

import LeftistHeap from '@/PriorityQueue/LeftistHeap/LeftistHeap'

describe('Leftist Heap', () => {
    let heap: LeftistHeap<number>
    test('initialiazation', () => {
        heap = new LeftistHeap()
        expect(heap).toBeInstanceOf(LeftistHeap)
        expect(heap.getMin()).toBeNull()
        expect(heap.size).toBe(0)
    })
    test('insert', () => {
        const data = [10, 8, 3, 21, 14, 17]
        data.forEach(val => heap.insert(val))
        expect(heap.size).toBe(6)
    })
    test('getMin', () => {
        expect(heap.getMin()).toBe(3)
    })
    test('deleteMin', () => {
        heap.deleteMin()
        expect(heap.size).toBe(5)
        expect(heap.getMin()).toBe(8)
    })
    test('merge', () => {
        const heap1 = new LeftistHeap<number>()
        heap.merge(heap1)
        expect(heap.size).toBe(5)
        expect(heap.getMin()).toBe(8)
        const heap2 = new LeftistHeap<number>()
        const data = [6, 12, 18, 24]
        data.forEach(val => heap2.insert(val))
        heap.merge(heap2)
        expect(heap.size).toBe(9)
        expect(heap.getMin()).toBe(6)
    })
})
