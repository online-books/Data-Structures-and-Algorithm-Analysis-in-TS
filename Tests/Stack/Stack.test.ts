/** @format */

import Stack from '@/Stack/Stack'

describe('Stack', () => {
    let stack: Stack<number>
    test('stack initialization', () => {
        stack = new Stack<number>(5)
        expect(stack).toBeInstanceOf(Stack)
        expect(stack.top).toBeNull()
        expect(stack.isEmpty()).toBeTruthy()
    })
    test('stack push', () => {
        const data = [1, 2, 3, 4, 5]
        data.forEach(value => {
            stack.push(value)
        })
        expect(stack.top).toBe(5)
        expect(stack.isFull()).toBeTruthy()
        expect(() => {
            stack.push(6)
        }).toThrowError()
    })
    test('stack pop', () => {
        const data = []
        while (!stack.isEmpty()) {
            data.push(stack.pop())
        }
        expect(data).toStrictEqual([5, 4, 3, 2, 1])
        expect(() => {
            stack.pop()
        }).toThrowError()
    })
})
