/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import maximumFlow, {copyDirectedGraph, searchMaxAugmentingPath} from '@/graph/NetworkFlow'
import {SHORTEST_PATH_EDGES} from './EdgeData'

describe('NetworkFlow', () => {
    const directedGraph = new DirectedGraph()
    SHORTEST_PATH_EDGES.forEach(edge => {
        directedGraph.addEdge(...edge)
    })
    test('duplicate directed graph', () => {
        expect(copyDirectedGraph(directedGraph)).toStrictEqual(directedGraph)
    })
    test('search augmenting path', () => {
        expect(searchMaxAugmentingPath(directedGraph, 'a', 'f')).toStrictEqual({
            path: ['a', 'b', 'd', 'c', 'f'],
            flow: [2, 3, 2, 5],
            weight: 2,
        })
        expect(searchMaxAugmentingPath(directedGraph, 'd', 'f')).toStrictEqual({
            path: ['d', 'f'],
            flow: [8],
            weight: 8,
        })
        expect(searchMaxAugmentingPath(directedGraph, 'e', 'f')).toStrictEqual({
            path: ['e', 'g', 'f'],
            flow: [6, 1],
            weight: 1,
        })
        expect(searchMaxAugmentingPath(directedGraph, 'g', 'b')).toStrictEqual({
            path: [],
            flow: [],
            weight: 0,
        })
    })
    test('maximum flow', () => {
        expect(maximumFlow(directedGraph, 'a', 'f')).toBe(3)
        expect(maximumFlow(directedGraph, 'b', 'e')).toBe(6)
        expect(maximumFlow(directedGraph, 'b', 'f')).toBe(4)
        expect(maximumFlow(directedGraph, 'g', 'c')).toBe(0)
    })
})
