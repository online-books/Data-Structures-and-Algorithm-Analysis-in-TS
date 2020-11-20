/** @format */

export const edges: Array<[string, string]> = [
    ['a', 'b'],
    ['a', 'd'],
    ['b', 'c'],
    ['b', 'f'],
    ['c', 'a'],
    ['c', 'd'],
    ['c', 'e'],
    ['d', 'e'],
    ['f', 'c'],
    ['g', 'f'],
    ['g', 'h'],
    ['h', 'f'],
    ['h', 'j'],
    ['j', 'i'],
    ['i', 'h'],
]

export const weightedEdges: Array<[string, string, number]> = [
    ['a', 'b', 2],
    ['a', 'd', 1],
    ['b', 'd', 3],
    ['b', 'e', 4],
    ['c', 'a', 4],
    ['c', 'f', 5],
    ['d', 'c', 2],
    ['d', 'e', 2],
    ['d', 'f', 8],
    ['d', 'g', 4],
    ['e', 'g', 6],
    ['g', 'f', 1],
]

export const weightedNegativeEdges: Array<[string, string, number]> = [
    ['a', 'b', 2],
    ['b', 'f', 1],
    ['b', 'c', 3],
    ['f', 'c', 4],
    ['c', 'a', -10],
]
