/** @format */

import Queue from '@/Queue/Queue'

describe('Queue', () => {
    let queue: Queue<number>
    test('initialization', () => {
        queue = new Queue<number>()
        expect(queue).toBeInstanceOf(Queue)
        expect(queue.size).toBe(0)
        expect(queue.frontElement).toBeNull()
    })
    test('enqueue', () => {
        queue.enqueue(1)
        expect(queue.frontElement).toBe(1)
        expect(queue.size).toBe(1)
        queue.enqueue(2)
        expect(queue.frontElement).toBe(1)
        expect(queue.size).toBe(2)
    })
    test('dequeue', () => {
        const element = queue.dequeue()
        expect(element).toBe(1)
        expect(queue.frontElement).toBe(2)
    })
    test('exist', () => {
        expect(queue.exist(3)).toBeFalsy()
        expect(queue.exist(2)).toBeTruthy()
    })
})
