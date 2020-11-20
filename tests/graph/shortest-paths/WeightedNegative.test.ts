/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import weightedNegativeShortestPaths from '@/graph/shortest-paths/WeightedNegative'
import {weightedNegativeEdges} from '../EdgeData'

describe('weighted negative shortest paths', () => {
    const graph = new DirectedGraph()
    weightedNegativeEdges.forEach(edge => {
        graph.addEdge(...edge)
    })
    test('the result of a vertex not in graph should be null', () => {
        expect(weightedNegativeShortestPaths(graph, 'g')).toBeNull()
    })
    test('going as expected', () => {
        const result = weightedNegativeShortestPaths(graph, 'a')!
        expect(result).not.toBeNull()
        expect(result['a'].distance).toBe(-20)
    })
})
