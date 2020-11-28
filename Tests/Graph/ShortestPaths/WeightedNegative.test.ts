/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import weightedNegativeShortestPaths from '@/Graph/ShortestPaths/WeightedNegative'
import {SHORTEST_PATH_EDGES} from '../EdgeData'

describe('weighted negative shortest paths', () => {
    const graph = new DirectedGraph()
    SHORTEST_PATH_EDGES.forEach(edge => {
        graph.addEdge(...edge)
    })
    graph.addEdge('a', 'c', -10)
    test('the result of a vertex not in graph should be null', () => {
        expect(weightedNegativeShortestPaths(graph, 'h')).toBeNull()
    })
    test('going as expected', () => {
        const result = weightedNegativeShortestPaths(graph, 'a')!
        expect(result).not.toBeNull()
        expect(result['c'].distance).toBe(-52)
    })
})
