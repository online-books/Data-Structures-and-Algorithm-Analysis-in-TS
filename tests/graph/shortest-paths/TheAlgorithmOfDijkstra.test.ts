/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import dijkstra from '@/graph/shortest-paths/TheAlgorithmOfDijkstra'
import {weightedEdges} from '../EdgeData'

describe("dijkstra's algorithm", () => {
    const directedGraph = new DirectedGraph()
    weightedEdges.forEach(edge => {
        directedGraph.addEdge(...edge)
    })
    test('the result of a vertex not in graph should be null', () => {
        expect(dijkstra(directedGraph, 's')).toBeNull()
    })
    test('negative weight should raise an error', () => {
        const anotherGraph = new DirectedGraph()
        anotherGraph.addEdge('a', 'b', -1)
        expect(() => {
            dijkstra(anotherGraph, 'a')
        }).toThrowError()
    })
    test('going as expected', () => {
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
