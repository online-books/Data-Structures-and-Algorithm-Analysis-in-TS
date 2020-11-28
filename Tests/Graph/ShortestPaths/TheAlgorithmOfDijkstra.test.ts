/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import dijkstra from '@/Graph/ShortestPaths/TheAlgorithmOfDijkstra'
import {SHORTEST_PATH_EDGES} from '../EdgeData'

function createDirectedGrap(): DirectedGraph {
    const directedGraph = new DirectedGraph()
    SHORTEST_PATH_EDGES.forEach(edge => {
        directedGraph.addEdge(...edge)
    })
    return directedGraph
}

describe("dijkstra's algorithm", () => {
    test('the result of a vertex not in graph should be null', () => {
        const directedGraph = createDirectedGrap()
        expect(dijkstra(directedGraph, 's')).toBeNull()
    })
    test('negative weight should raise an error', () => {
        const directedGraph = createDirectedGrap()

        directedGraph.addEdge('f', 'b', -1)
        expect(() => {
            dijkstra(directedGraph, 'a')
        }).toThrowError()
    })
    test('going as expected', () => {
        const directedGraph = createDirectedGrap()
        const result = dijkstra(directedGraph, 'a')!
        expect(result).not.toBeNull()
        expect(result['a']).toEqual({
            path: ['a'],
            distance: 0,
        })
        expect(result['d']).toEqual({
            path: ['a', 'd'],
            distance: 1,
        })
        expect(result['b']).toEqual({
            path: ['a', 'b'],
            distance: 2,
        })
        expect(result['c']).toEqual({
            path: ['a', 'd', 'c'],
            distance: 3,
        })
        expect(result['e']).toEqual({
            path: ['a', 'd', 'e'],
            distance: 3,
        })
        expect(result['g']).toEqual({
            path: ['a', 'd', 'g'],
            distance: 5,
        })
        expect(result['f']).toEqual({
            path: ['a', 'd', 'g', 'f'],
            distance: 6,
        })
    })
})
