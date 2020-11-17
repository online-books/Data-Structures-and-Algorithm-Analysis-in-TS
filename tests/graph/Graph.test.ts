/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import UnDirectedGraph from '@/graph/UnDirectedGraph'
import {edges} from './EdgeData'

describe('graph', () => {
    describe('Directed Graph', () => {
        let directedgraph: DirectedGraph

        test('initialization', () => {
            directedgraph = new DirectedGraph()
            expect(directedgraph).toBeInstanceOf(DirectedGraph)
        })
        test('add edge', () => {
            const result = edges.every(([from, to]) => {
                return directedgraph.addEdge(from, to)
            })
            expect(result).toBeTruthy()
            expect(directedgraph.addEdge('b', 'f')).toBeFalsy()
            expect(directedgraph.getAdjVertices('a')).toStrictEqual(['b', 'd'])
            expect(directedgraph.getAdjVertices('f')).toStrictEqual(['c'])
            expect(directedgraph.getAdjVertices('h')).toStrictEqual(['f', 'j'])
            expect(directedgraph.getAdjVertices('e')).toStrictEqual([])
            expect(directedgraph.getAdjVertices('k')).toStrictEqual([])
        })
        test('get degree', () => {
            expect(directedgraph.getOutdegreeByVertexName('a')).toBe(2)
            expect(directedgraph.getIndegreeByVertexName('a')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('e')).toBe(0)
            expect(directedgraph.getIndegreeByVertexName('e')).toBe(2)
            expect(directedgraph.getIndegreeByVertexName('k')).toBe(-1)
            expect(directedgraph.getOutdegreeByVertexName('k')).toBe(-1)
        })
        test('remove edge', () => {
            expect(directedgraph.removeEdge('a', 'b')).toBeTruthy()
            expect(directedgraph.getAdjVertices('a')).toStrictEqual(['d'])
            expect(directedgraph.removeEdge('d', 'a')).toBeFalsy()
            expect(directedgraph.removeEdge('a', 'd')).toBeTruthy()
            expect(directedgraph.getAdjVertices('a')).toStrictEqual([])
            expect(directedgraph.removeEdge('c', 'a')).toBeTruthy()
            expect(directedgraph.getAdjVertices('c')).toStrictEqual(['d', 'e'])
            expect(directedgraph.removeEdge('c', 'd')).toBeTruthy()
            expect(directedgraph.getAdjVertices('d')).toStrictEqual(['e'])
            expect(directedgraph.removeEdge('d', 'e')).toBeTruthy()
            expect(directedgraph.getAdjVertices('d')).toStrictEqual([])
            expect(directedgraph.removeEdge('c', 'k')).toBeFalsy()
            expect(directedgraph.removeEdge('k', 'c')).toBeFalsy()
        })
        test('get degree after removing edge', () => {
            expect(directedgraph.getIndegreeByVertexName('a')).toBe(-1)
            expect(directedgraph.getOutdegreeByVertexName('a')).toBe(-1)
            expect(directedgraph.getIndegreeByVertexName('d')).toBe(-1)
            expect(directedgraph.getOutdegreeByVertexName('d')).toBe(-1)
            expect(directedgraph.getIndegreeByVertexName('b')).toBe(0)
            expect(directedgraph.getOutdegreeByVertexName('b')).toBe(2)
            expect(directedgraph.getIndegreeByVertexName('c')).toBe(2)
            expect(directedgraph.getOutdegreeByVertexName('c')).toBe(1)
        })
        test('add edge after removing edge', () => {
            expect(directedgraph.addEdge('e', 'k')).toBeTruthy()
            expect(directedgraph.getAdjVertices('e')).toStrictEqual(['k'])
            expect(directedgraph.getIndegreeByVertexName('e')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('e')).toBe(1)
            expect(directedgraph.getAdjVertices('k')).toStrictEqual([])
            expect(directedgraph.getIndegreeByVertexName('k')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('k')).toBe(0)
        })
    })

    describe('UnDirected Graph', () => {
        let unDirectedGraph: UnDirectedGraph
        test('initialization', () => {
            unDirectedGraph = new UnDirectedGraph()
            expect(unDirectedGraph).toBeInstanceOf(UnDirectedGraph)
        })
        test('add edge', () => {
            const result = edges.every(([from, to]) => {
                return unDirectedGraph.addEdge(from, to)
            })
            expect(result).toBeTruthy()
            expect(unDirectedGraph.addEdge('h', 'g')).toBeFalsy()
            expect(unDirectedGraph.getAdjVertices('a')).toStrictEqual(['b', 'd', 'c'])
            expect(unDirectedGraph.getAdjVertices('d')).toStrictEqual(['a', 'c', 'e'])
            expect(unDirectedGraph.getAdjVertices('f')).toStrictEqual(['b', 'c', 'g', 'h'])
            expect(unDirectedGraph.getAdjVertices('k')).toStrictEqual([])
        })
        test('get degree', () => {
            expect(unDirectedGraph.getIndegreeByVertexName('a')).toBe(3)
            expect(unDirectedGraph.getOutdegreeByVertexName('a')).toBe(3)
            expect(unDirectedGraph.getIndegreeByVertexName('c')).toBe(5)
            expect(unDirectedGraph.getOutdegreeByVertexName('c')).toBe(5)
            expect(unDirectedGraph.getIndegreeByVertexName('h')).toBe(4)
            expect(unDirectedGraph.getOutdegreeByVertexName('h')).toBe(4)
            expect(unDirectedGraph.getIndegreeByVertexName('k')).toBe(-1)
            expect(unDirectedGraph.getOutdegreeByVertexName('k')).toBe(-1)
        })
        test('remove edge', () => {
            expect(unDirectedGraph.removeEdge('a', 'f')).toBeFalsy()
            expect(unDirectedGraph.removeEdge('k', 'a')).toBeFalsy()
            expect(unDirectedGraph.removeEdge('a', 'k')).toBeFalsy()
            expect(unDirectedGraph.removeEdge('a', 'b')).toBeTruthy()
            expect(unDirectedGraph.getAdjVertices('a')).toStrictEqual(['d', 'c'])
            expect(unDirectedGraph.getAdjVertices('b')).toStrictEqual(['c', 'f'])
            expect(unDirectedGraph.removeEdge('a', 'd')).toBeTruthy()
            expect(unDirectedGraph.getAdjVertices('a')).toStrictEqual(['c'])
            expect(unDirectedGraph.getAdjVertices('d')).toStrictEqual(['c', 'e'])
            expect(unDirectedGraph.removeEdge('a', 'c')).toBeTruthy()
            expect(unDirectedGraph.getAdjVertices('a')).toStrictEqual([])
            expect(unDirectedGraph.getAdjVertices('c')).toStrictEqual(['b', 'd', 'e', 'f'])
            expect(unDirectedGraph.removeEdge('d', 'c')).toBeTruthy()
            expect(unDirectedGraph.getAdjVertices('c')).toStrictEqual(['b', 'e', 'f'])
            expect(unDirectedGraph.getAdjVertices('d')).toStrictEqual(['e'])
            expect(unDirectedGraph.removeEdge('e', 'd')).toBeTruthy()
            expect(unDirectedGraph.getAdjVertices('e')).toStrictEqual(['c'])
            expect(unDirectedGraph.getAdjVertices('d')).toStrictEqual([])
        })
        test('get degree after removing edge', () => {
            expect(unDirectedGraph.getIndegreeByVertexName('a')).toBe(-1)
            expect(unDirectedGraph.getOutdegreeByVertexName('a')).toBe(-1)
            expect(unDirectedGraph.getIndegreeByVertexName('c')).toBe(3)
            expect(unDirectedGraph.getOutdegreeByVertexName('c')).toBe(3)
            expect(unDirectedGraph.getIndegreeByVertexName('d')).toBe(-1)
            expect(unDirectedGraph.getOutdegreeByVertexName('d')).toBe(-1)
        })
        test('add edge after removing edge', () => {
            expect(unDirectedGraph.addEdge('k', 'e')).toBeTruthy()
            expect(unDirectedGraph.getAdjVertices('k')).toStrictEqual(['e'])
            expect(unDirectedGraph.getAdjVertices('e')).toStrictEqual(['c', 'k'])
        })
    })
})
