/** @format */

import kruskal from '@/Graph/MinimumSpanningTree/Kruskal'
import UndirectedGraph from '@/Graph/UndirectedGraph'
import {SHORTEST_PATH_EDGES} from '../EdgeData'

describe('Kruskal algorithm', () => {
    test('graph with weighted edges', () => {
        const undirectedGraph = new UndirectedGraph()
        SHORTEST_PATH_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        const edges = kruskal(undirectedGraph)
        expect(edges).toEqual([
            ['d', 'a', 1],
            ['g', 'f', 1],
            ['a', 'b', 2],
            ['d', 'c', 2],
            ['b', 'd', 3],
            ['g', 'd', 4],
            ['e', 'g', 6],
        ])
    })
})
