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
        prim(unDirectedGraph)
    })
})
