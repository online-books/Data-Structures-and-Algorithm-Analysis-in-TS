/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import UnDirectedGraph from '@/Graph/UndirectedGraph'
import {STRONG_BRANCH_EDGES} from './EdgeData'

function getAdjVertices(graph: DirectedGraph | UnDirectedGraph, vertexName: string) {
    const adjVertices: string[] = []
    graph.traverseAdjVertices(vertexName, adjVertexName => {
        adjVertices.push(adjVertexName)
    })
    return adjVertices
}

describe('graph', () => {
    describe('Directed Graph', () => {
        let directedgraph: DirectedGraph

        test('initialization', () => {
            directedgraph = new DirectedGraph()
            expect(directedgraph).toBeInstanceOf(DirectedGraph)
        })
        test('add edge', () => {
            const result = STRONG_BRANCH_EDGES.every(([from, to]) => {
                return directedgraph.addEdge(from, to)
            })
            expect(result).toBeTruthy()
            expect(directedgraph.getAllVertices()).toStrictEqual(['a', 'b', 'd', 'c', 'f', 'e', 'g', 'h', 'j', 'i'])
            expect(directedgraph.addEdge('b', 'f')).toBeFalsy()
            expect(getAdjVertices(directedgraph, 'a')).toStrictEqual(['b', 'd'])
            expect(getAdjVertices(directedgraph, 'f')).toStrictEqual(['c'])
            expect(getAdjVertices(directedgraph, 'h')).toStrictEqual(['f', 'j'])
            expect(getAdjVertices(directedgraph, 'e')).toStrictEqual([])
            expect(getAdjVertices(directedgraph, 'k')).toStrictEqual([])
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
            expect(getAdjVertices(directedgraph, 'a')).toStrictEqual(['d'])
            expect(directedgraph.removeEdge('d', 'a')).toBeFalsy()
            expect(directedgraph.removeEdge('a', 'd')).toBeTruthy()
            expect(getAdjVertices(directedgraph, 'a')).toStrictEqual([])
            expect(directedgraph.removeEdge('c', 'a')).toBeTruthy()
            expect(getAdjVertices(directedgraph, 'c')).toStrictEqual(['d', 'e'])
            expect(directedgraph.getAllVertices()).toStrictEqual(['b', 'd', 'c', 'f', 'e', 'g', 'h', 'j', 'i'])
            expect(directedgraph.removeEdge('c', 'd')).toBeTruthy()
            expect(getAdjVertices(directedgraph, 'd')).toStrictEqual(['e'])
            expect(directedgraph.removeEdge('d', 'e')).toBeTruthy()
            expect(getAdjVertices(directedgraph, 'd')).toStrictEqual([])
            expect(directedgraph.removeEdge('c', 'k')).toBeFalsy()
            expect(directedgraph.removeEdge('k', 'c')).toBeFalsy()
            expect(directedgraph.getAllVertices()).toStrictEqual(['b', 'c', 'f', 'e', 'g', 'h', 'j', 'i'])
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
        test('add edge after removing edges', () => {
            expect(directedgraph.addEdge('e', 'k')).toBeTruthy()
            expect(getAdjVertices(directedgraph, 'e')).toStrictEqual(['k'])
            expect(directedgraph.getIndegreeByVertexName('e')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('e')).toBe(1)
            expect(getAdjVertices(directedgraph, 'k')).toStrictEqual([])
            expect(directedgraph.getIndegreeByVertexName('k')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('k')).toBe(0)
            expect(directedgraph.getAllVertices()).toStrictEqual(['b', 'k', 'c', 'f', 'e', 'g', 'h', 'j', 'i'])
        })
    })

    describe('UnDirected Graph', () => {
        let unDirectedGraph: UnDirectedGraph
        test('initialization', () => {
            unDirectedGraph = new UnDirectedGraph()
            expect(unDirectedGraph).toBeInstanceOf(UnDirectedGraph)
        })
        test('add edge', () => {
            const result = STRONG_BRANCH_EDGES.every(([from, to]) => {
                return unDirectedGraph.addEdge(from, to)
            })
            expect(result).toBeTruthy()
            expect(unDirectedGraph.addEdge('h', 'g')).toBeFalsy()
            expect(unDirectedGraph.addEdge('h', 'h')).toBeFalsy()
            expect(getAdjVertices(unDirectedGraph, 'a')).toStrictEqual(['b', 'd', 'c'])
            expect(getAdjVertices(unDirectedGraph, 'd')).toStrictEqual(['a', 'c', 'e'])
            expect(getAdjVertices(unDirectedGraph, 'f')).toStrictEqual(['b', 'c', 'g', 'h'])
            expect(getAdjVertices(unDirectedGraph, 'k')).toStrictEqual([])
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
            expect(unDirectedGraph.removeEdge('a', 'a')).toBeFalsy()
            expect(unDirectedGraph.removeEdge('a', 'b')).toBeTruthy()
            expect(getAdjVertices(unDirectedGraph, 'a')).toStrictEqual(['d', 'c'])
            expect(getAdjVertices(unDirectedGraph, 'b')).toStrictEqual(['c', 'f'])
            expect(unDirectedGraph.removeEdge('a', 'd')).toBeTruthy()
            expect(getAdjVertices(unDirectedGraph, 'a')).toStrictEqual(['c'])
            expect(getAdjVertices(unDirectedGraph, 'd')).toStrictEqual(['c', 'e'])
            expect(unDirectedGraph.removeEdge('a', 'c')).toBeTruthy()
            expect(getAdjVertices(unDirectedGraph, 'a')).toStrictEqual([])
            expect(getAdjVertices(unDirectedGraph, 'c')).toStrictEqual(['b', 'd', 'e', 'f'])
            expect(unDirectedGraph.removeEdge('d', 'c')).toBeTruthy()
            expect(getAdjVertices(unDirectedGraph, 'c')).toStrictEqual(['b', 'e', 'f'])
            expect(getAdjVertices(unDirectedGraph, 'd')).toStrictEqual(['e'])
            expect(unDirectedGraph.removeEdge('e', 'd')).toBeTruthy()
            expect(getAdjVertices(unDirectedGraph, 'e')).toStrictEqual(['c'])
            expect(getAdjVertices(unDirectedGraph, 'd')).toStrictEqual([])
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
            expect(getAdjVertices(unDirectedGraph, 'k')).toStrictEqual(['e'])
            expect(getAdjVertices(unDirectedGraph, 'e')).toStrictEqual(['c', 'k'])
        })
    })
})
