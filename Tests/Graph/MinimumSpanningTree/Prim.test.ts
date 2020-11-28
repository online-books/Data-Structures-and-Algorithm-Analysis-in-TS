/** @format */

import prim from '@/Graph/MinimumSpanningTree/Prim'
import UnDirectedGraph from '@/Graph/UndirectedGraph'
import {SHORTEST_PATH_EDGES} from '../EdgeData'

describe('Prim algorithm', () => {
    const unDirectedGraph = new UnDirectedGraph()
    SHORTEST_PATH_EDGES.forEach(edge => {
        unDirectedGraph.addEdge(...edge)
    })
    test('Prim', () => {
        const edges = prim(unDirectedGraph)
        expect(edges).toStrictEqual([
            ['a', 'd', 1],
            ['d', 'c', 2],
            ['a', 'b', 2],
            ['d', 'g', 4],
            ['g', 'f', 1],
            ['g', 'e', 6],
        ])
    })
})
