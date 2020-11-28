/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import unWeightedShortestPaths from '@/Graph/ShortestPaths/UnweightedShortestPaths'
import {SHORTEST_PATH_EDGES} from '../EdgeData'

describe('unweighted shortest paths', () => {
    const directedGraph = new DirectedGraph()
    SHORTEST_PATH_EDGES.forEach(edge => {
        directedGraph.addEdge(edge[0], edge[1])
    })
    test("a nonexistend vertex's shortest paths should be empty", () => {
        const result = unWeightedShortestPaths(directedGraph, 'k')
        expect(result).toEqual({})
    })
    test('getting shortest path of a', () => {
        const result = unWeightedShortestPaths(directedGraph, 'a')
        expect(result['b']).toEqual(['a', 'b'])
        expect(result['c']).toEqual(['a', 'd', 'c'])
        expect(result['d']).toEqual(['a', 'd'])
        expect(result['e']).toEqual(['a', 'b', 'e'])
        expect(result['f']).toEqual(['a', 'd', 'f'])
        expect(result['h']).toBeUndefined()
    })
})
