/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import topSort from '@/Graph/TopSort'
import {TOP_SORT_EDGES, SHORTEST_PATH_EDGES} from './EdgeData'

describe('top sort', () => {
    test('a graph of having cycle should throw an error', () => {
        const graph = new DirectedGraph()
        SHORTEST_PATH_EDGES.forEach(edge => {
            graph.addEdge(...edge)
        })
        const fn = jest.fn(() => {
            topSort(graph)
        })
        expect(fn).toThrowError()
    })
    test('going as expected ', () => {
        const graph = new DirectedGraph()
        TOP_SORT_EDGES.forEach(edge => {
            graph.addEdge(...edge)
        })
        expect(topSort(graph)).toStrictEqual(['a', 'b', 'd', 'e', 'c', 'g', 'f'])
    })
})
