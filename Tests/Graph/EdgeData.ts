/** @format */

export const STRONG_BRANCH_EDGES: Array<[string, string]> = [
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

export const SHORTEST_PATH_EDGES: Array<[string, string, number]> = [
    ['a', 'b', 2],
    ['a', 'd', 1],
    ['b', 'd', 3],
    ['b', 'e', 10],
    ['c', 'a', 4],
    ['c', 'f', 5],
    ['d', 'c', 2],
    ['d', 'e', 7],
    ['d', 'f', 8],
    ['d', 'g', 4],
    ['e', 'g', 6],
    ['g', 'f', 1],
]

export const BICONNECTED_EDGES: Array<[string, string]> = [
    ['a', 'b'],
    ['a', 'd'],
    ['a', 'e'],
    ['b', 'd'],
    ['d', 'c'],
    ['b', 'c'],
    ['c', 'e'],
]

export const ARTICULATION_POINTS_EDGES: Array<[string, string]> = [
    ['a', 'b'],
    ['a', 'd'],
    ['b', 'c'],
    ['c', 'g'],
    ['c', 'd'],
    ['d', 'f'],
    ['d', 'e'],
    ['e', 'f'],
]
