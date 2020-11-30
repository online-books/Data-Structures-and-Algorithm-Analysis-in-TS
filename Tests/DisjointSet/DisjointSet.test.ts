/** @format */

import DisjointSet from '@/DisjointSet/DisjointSet'

describe('disjoint set', () => {
    const SIZE = 10
    let disjointSet: DisjointSet
    test('initialization', () => {
        disjointSet = new DisjointSet(SIZE)
        expect(disjointSet).toBeInstanceOf(DisjointSet)
    })
    test('union and find', () => {
        disjointSet.union(5, 6)
        expect(disjointSet.find(5)).toBe(5)
        expect(disjointSet.find(6)).toBe(5)
        disjointSet.union(1, 5)
        expect(disjointSet.find(1)).toBe(5)
        disjointSet.union(2, 3)
        disjointSet.union(4, 8)
        expect(disjointSet.find(2)).toBe(2)
        expect(disjointSet.find(3)).toBe(2)
        expect(disjointSet.find(8)).toBe(4)
    })
})
