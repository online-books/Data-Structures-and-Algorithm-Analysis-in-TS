/** @format */

import {compareFn, generateRandomKeys, midian3, swap} from '@/shared/util'

describe('util', () => {
    test('increase compare function', () => {
        const a = [2, 1]
        const b = [1, 2]
        const c = [3, 2, 1]
        const d = [1, 2, 3]

        a.sort(compareFn(false))
        b.sort(compareFn(true))
        c.sort(compareFn(true))
        d.sort(compareFn(false))
        expect(a).toEqual([1, 2])
        expect(b).toEqual([2, 1])
        expect(c).toEqual([3, 2, 1])
        expect(d).toEqual([1, 2, 3])
    })
    test('decrease compare function', () => {
        const a = [1, 2]
        const b = [2, 1]
        a.sort(compareFn())
        b.sort(compareFn())
        expect(a).toEqual([2, 1])
        expect(b).toEqual([2, 1])
    })
    test('generate random keys', () => {
        const characters = 'abcdefg'
        expect(() => {
            generateRandomKeys(characters, 8, 5)
        }).toThrow(Error)
        const keys = generateRandomKeys(characters, 2, 14)
        expect(keys.every(key => key.length === 2)).toBeTruthy()
        expect(keys.length).toBe(14)
    })
    test('swap array elements', () => {
        const n = [1, 2, 3, 4]
        swap(n, 2, 1)
        expect(n).toEqual([1, 3, 2, 4])
    })
    test('midian3', () => {
        expect(() => {
            midian3([1])
        }).toThrowError()
        expect(midian3([1, 2, 3])).toBe(2)
        expect(midian3([1, 3, 2])).toBe(2)
        expect(midian3([2, 1, 3])).toBe(2)
        expect(midian3([2, 3, 1])).toBe(2)
        expect(midian3([3, 2, 1])).toBe(2)
        expect(midian3([3, 1, 2])).toBe(2)
    })
})
