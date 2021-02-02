/** @format */

import turnpike from '@/Algorithms/BackTracking/Turnpike'

describe('back tracking', () => {
    test('turnpike', () => {
        const distance = [1, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 8, 10]
        const points = turnpike(distance)
        expect(points).toStrictEqual([0, 3, 5, 6, 8, 10])
        expect(turnpike([])).toStrictEqual([])
        expect(() => {
            turnpike([1, 2])
        }).toThrowError()
    })
})
