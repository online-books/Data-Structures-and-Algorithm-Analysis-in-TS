/** @format */

import findArticulationPoints from '@/Graph/Biconnectivity'
import UndirectedGraph from '@/Graph/UndirectedGraph'
import {ARTICULATION_POINTS_EDGES, BICONNECTED_EDGES} from './EdgeData'

describe('Biconnectivity', () => {
    test('graph without articulation points', () => {
        const undirectedGraph = new UndirectedGraph()
        BICONNECTED_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        expect(findArticulationPoints(undirectedGraph)).toStrictEqual([])
    })
    test('graph with articulation points', () => {
        const undirectedGraph = new UndirectedGraph()
        ARTICULATION_POINTS_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        expect(findArticulationPoints(undirectedGraph)).toStrictEqual(['c', 'd'])
    })
})
