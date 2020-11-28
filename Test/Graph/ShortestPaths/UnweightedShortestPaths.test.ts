/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import unWeightedShortestPaths from '@/graph/shortest-paths/UnweightedShortestPaths'
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
        expect(result['c']).toEqual(['a', 'b', 'c'])
        expect(result['d']).toEqual(['a', 'd'])
        expect(result['e']).toEqual(['a', 'd', 'e'])
        expect(result['f']).toEqual(['a', 'b', 'f'])
        expect(result['g']).toEqual([])
        expect(result['h']).toEqual([])
        expect(result['i']).toEqual([])
        expect(result['j']).toEqual([])
    })
    test('getting shortest path of f', () => {
        const result = unWeightedShortestPaths(directedGraph, 'h')
        expect(result['a']).toEqual(['h', 'f', 'c', 'a'])
        expect(result['c']).toEqual(['h', 'f', 'c'])
        expect(result['b']).toEqual(['h', 'f', 'c', 'a', 'b'])
        expect(result['d']).toEqual(['h', 'f', 'c', 'd'])
        expect(result['e']).toEqual(['h', 'f', 'c', 'e'])
        expect(result['g']).toEqual([])
        expect(result['f']).toEqual(['h', 'f'])
        expect(result['i']).toEqual(['h', 'j', 'i'])
        expect(result['j']).toEqual(['h', 'j'])
    })
})
