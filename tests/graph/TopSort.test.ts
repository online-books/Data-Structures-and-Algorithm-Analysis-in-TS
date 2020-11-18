/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import topSort from '@/graph/TopSort'
import {edges} from './EdgeData'

describe('top sort', () => {
    const graph = new DirectedGraph()
    test('a graph of having cycle should throw an error', () => {
        edges.forEach(edge => {
            graph.addEdge(edge[0], edge[1])
        })
        expect(() => {
            topSort(graph)
        }).toThrowError()
    })
    test('going as expected after removing several edges', () => {
        graph.removeEdge('a', 'b')
        graph.removeEdge('j', 'i')
        expect(topSort(graph)).toStrictEqual(['b', 'g', 'i', 'h', 'f', 'j', 'c', 'a', 'd', 'e'])
    })
})
