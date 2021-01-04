/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import UndirectedGraph from '@/Graph/UndirectedGraph'
import {STRONG_BRANCH_EDGES} from './EdgeData'

function getAdjVertices(graph: DirectedGraph | UndirectedGraph, vertexName: string) {
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
            expect(directedgraph.getIndegreeByVertexName('k')).toBe(0)
            expect(directedgraph.getOutdegreeByVertexName('k')).toBe(0)
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
            expect(directedgraph.hasVertex('d')).toBeFalsy()
            expect(getAdjVertices(directedgraph, 'd')).toStrictEqual([])
            expect(directedgraph.removeEdge('c', 'k')).toBeFalsy()
            expect(directedgraph.removeEdge('k', 'c')).toBeFalsy()
            expect(directedgraph.getAllVertices()).toStrictEqual(['b', 'c', 'f', 'e', 'g', 'h', 'j', 'i'])
        })
        test('get degree after removing edge', () => {
            expect(directedgraph.getIndegreeByVertexName('a')).toBe(0)
            expect(directedgraph.getOutdegreeByVertexName('a')).toBe(0)
            expect(directedgraph.getIndegreeByVertexName('d')).toBe(0)
            expect(directedgraph.getOutdegreeByVertexName('d')).toBe(0)
            expect(directedgraph.getIndegreeByVertexName('b')).toBe(0)
            expect(directedgraph.getOutdegreeByVertexName('b')).toBe(2)
            expect(directedgraph.getIndegreeByVertexName('c')).toBe(2)
            expect(directedgraph.getOutdegreeByVertexName('c')).toBe(1)
        })
        test('add edge after removing edges', () => {
            expect(directedgraph.addEdge('e', 'k')).toBeTruthy()
            expect(directedgraph.hasVertex('k')).toBeTruthy()
            expect(getAdjVertices(directedgraph, 'e')).toStrictEqual(['k'])
            expect(directedgraph.getIndegreeByVertexName('e')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('e')).toBe(1)
            expect(getAdjVertices(directedgraph, 'k')).toStrictEqual([])
            expect(directedgraph.getIndegreeByVertexName('k')).toBe(1)
            expect(directedgraph.getOutdegreeByVertexName('k')).toBe(0)
            expect(directedgraph.getAllVertices()).toStrictEqual(['b', 'c', 'f', 'e', 'g', 'h', 'j', 'i', 'k'])
        })
    })

    describe('Undirected Graph', () => {
        let undirectedGraph: UndirectedGraph
        test('initialization', () => {
            undirectedGraph = new UndirectedGraph()
            expect(undirectedGraph).toBeInstanceOf(UndirectedGraph)
        })
        test('add edge', () => {
            const result = STRONG_BRANCH_EDGES.every(([from, to]) => {
                return undirectedGraph.addEdge(from, to)
            })
            expect(result).toBeTruthy()
            expect(undirectedGraph.addEdge('h', 'g')).toBeFalsy()
            expect(undirectedGraph.addEdge('h', 'h')).toBeFalsy()
            expect(getAdjVertices(undirectedGraph, 'a')).toStrictEqual(['b', 'd', 'c'])
            expect(getAdjVertices(undirectedGraph, 'd')).toStrictEqual(['a', 'c', 'e'])
            expect(getAdjVertices(undirectedGraph, 'f')).toStrictEqual(['b', 'c', 'g', 'h'])
            expect(getAdjVertices(undirectedGraph, 'k')).toStrictEqual([])
        })
        test('get degree', () => {
            expect(undirectedGraph.getIndegreeByVertexName('a')).toBe(3)
            expect(undirectedGraph.getOutdegreeByVertexName('a')).toBe(3)
            expect(undirectedGraph.getIndegreeByVertexName('c')).toBe(5)
            expect(undirectedGraph.getOutdegreeByVertexName('c')).toBe(5)
            expect(undirectedGraph.getIndegreeByVertexName('h')).toBe(4)
            expect(undirectedGraph.getOutdegreeByVertexName('h')).toBe(4)
            expect(undirectedGraph.getIndegreeByVertexName('k')).toBe(0)
            expect(undirectedGraph.getOutdegreeByVertexName('k')).toBe(0)
        })
        test('remove edge', () => {
            expect(undirectedGraph.removeEdge('a', 'f')).toBeFalsy()
            expect(undirectedGraph.removeEdge('k', 'a')).toBeFalsy()
            expect(undirectedGraph.removeEdge('a', 'k')).toBeFalsy()
            expect(undirectedGraph.removeEdge('a', 'a')).toBeFalsy()
            expect(undirectedGraph.removeEdge('a', 'b')).toBeTruthy()
            expect(getAdjVertices(undirectedGraph, 'a')).toStrictEqual(['d', 'c'])
            expect(getAdjVertices(undirectedGraph, 'b')).toStrictEqual(['c', 'f'])
            expect(undirectedGraph.removeEdge('a', 'd')).toBeTruthy()
            expect(getAdjVertices(undirectedGraph, 'a')).toStrictEqual(['c'])
            expect(getAdjVertices(undirectedGraph, 'd')).toStrictEqual(['c', 'e'])
            expect(undirectedGraph.removeEdge('a', 'c')).toBeTruthy()
            expect(undirectedGraph.hasVertex('a')).toBeFalsy()
            expect(getAdjVertices(undirectedGraph, 'a')).toStrictEqual([])
            expect(getAdjVertices(undirectedGraph, 'c')).toStrictEqual(['b', 'd', 'e', 'f'])
            expect(undirectedGraph.removeEdge('d', 'c')).toBeTruthy()
            expect(getAdjVertices(undirectedGraph, 'c')).toStrictEqual(['b', 'e', 'f'])
            expect(getAdjVertices(undirectedGraph, 'd')).toStrictEqual(['e'])
            expect(undirectedGraph.removeEdge('e', 'd')).toBeTruthy()
            expect(getAdjVertices(undirectedGraph, 'e')).toStrictEqual(['c'])
            expect(getAdjVertices(undirectedGraph, 'd')).toStrictEqual([])
            expect(undirectedGraph.hasVertex('d')).toBeFalsy()
        })
        test('get degree after removing edge', () => {
            expect(undirectedGraph.getIndegreeByVertexName('a')).toBe(0)
            expect(undirectedGraph.getOutdegreeByVertexName('a')).toBe(0)
            expect(undirectedGraph.getIndegreeByVertexName('c')).toBe(3)
            expect(undirectedGraph.getOutdegreeByVertexName('c')).toBe(3)
            expect(undirectedGraph.getIndegreeByVertexName('d')).toBe(0)
            expect(undirectedGraph.getOutdegreeByVertexName('d')).toBe(0)
        })
        test('add edge after removing edge', () => {
            expect(undirectedGraph.addEdge('k', 'e')).toBeTruthy()
            expect(undirectedGraph.hasVertex('k')).toBeTruthy()
            expect(getAdjVertices(undirectedGraph, 'k')).toStrictEqual(['e'])
            expect(getAdjVertices(undirectedGraph, 'e')).toStrictEqual(['c', 'k'])
        })
    })
})
