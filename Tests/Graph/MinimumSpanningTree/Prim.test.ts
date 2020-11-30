/** @format */

import prim from '@/Graph/MinimumSpanningTree/Prim'
import UndirectedGraph from '@/Graph/UndirectedGraph'
import {SHORTEST_PATH_EDGES, STRONG_BRANCH_EDGES} from '../EdgeData'

describe('Prim algorithm', () => {
    test('graph with weighted edges', () => {
        const undirectedGraph = new UndirectedGraph()
        SHORTEST_PATH_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        const edges = prim(undirectedGraph)
        expect(edges).toStrictEqual([
            ['a', 'd', 1],
            ['d', 'c', 2],
            ['a', 'b', 2],
            ['d', 'g', 4],
            ['g', 'f', 1],
            ['g', 'e', 6],
        ])
    })
    test('graph without weighted edges', () => {
        const undirectedGraph = new UndirectedGraph()
        STRONG_BRANCH_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        const edges = prim(undirectedGraph)
        expect(edges).toStrictEqual([
            ['a', 'b', 1],
            ['a', 'c', 1],
            ['b', 'f', 1],
            ['c', 'e', 1],
            ['f', 'h', 1],
            ['f', 'g', 1],
            ['h', 'i', 1],
            ['h', 'j', 1],
            ['a', 'd', 1],
        ])
    })
})
