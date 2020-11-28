/** @format */

import DisjointSet from '@/DisjointSet/DisjointSet'

describe('disjoint set', () => {
    const SIZE = 10
    let disjointSet: DisjointSet
    test('initialization', () => {
        disjointSet = new DisjointSet(SIZE)
        expect(disjointSet).toBeInstanceOf(DisjointSet)
        const result = new Array(SIZE).every((value, index) => {
            disjointSet.find(index) === -1
        })
        expect(result).toBeTruthy()
    })
    test('union and find', () => {
        disjointSet.union(5, 6)
        expect(disjointSet.find(5)).toBe(-2)
        expect(disjointSet.find(6)).toBe(-2)
        disjointSet.union(1, 5)
        disjointSet.union(2, 3)
        disjointSet.union(3, 4)
        disjointSet.union(4, 8)
        disjointSet.union(0, 4)
        expect(disjointSet.find(2)).toBe(-5)
    })
    test('check range', () => {
        expect(() => {
            disjointSet.find(-1)
        }).toThrowError()
        expect(() => {
            disjointSet.find(SIZE)
        }).toThrowError()
    })
})
