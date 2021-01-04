/** @format */

import Queue from '@/Queue/Queue'

describe('Queue', () => {
    let queue: Queue<number>
    test('initialization', () => {
        queue = new Queue<number>(5)
        expect(queue).toBeInstanceOf(Queue)
        expect(queue.isEmpty()).toBeTruthy()
    })
    test('enqueue', () => {
        const data = [1, 2, 3, 4, 5]
        data.forEach(value => {
            queue.enqueue(value)
        })
        expect(queue.isFull()).toBeTruthy()
        expect(() => {
            queue.enqueue(6)
        }).toThrowError()
    })
    test('exist', () => {
        expect(queue.exist(2)).toBeTruthy()
        expect(queue.exist(6)).toBeFalsy()
    })
    test('dequeue', () => {
        const data = []
        data.push(queue.dequeue())
        data.push(queue.dequeue())
        queue.enqueue(9)
        queue.enqueue(8)
        while (!queue.isEmpty()) {
            data.push(queue.dequeue())
        }
        expect(data).toStrictEqual([1, 2, 3, 4, 5, 9, 8])
        expect(() => {
            queue.dequeue()
        }).toThrowError()
    })
})
