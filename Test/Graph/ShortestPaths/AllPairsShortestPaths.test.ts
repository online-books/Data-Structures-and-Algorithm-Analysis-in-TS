/** @format */

import DirectedGraph from '@/graph/DirectedGraph'
import allPairsShortestPath from '@/graph/shortest-paths/AllPairsShortestPaths'
import {SHORTEST_PATH_EDGES} from '../EdgeData'

function visualize(table: any[][]) {
    const rows = table.length
    const colums = table[0].length
    for (let i = 0; i < rows; i++) {
        let str = '|'
        for (let j = 0; j < colums; j++) {
            str += ` ${table[i][j]} |`
        }
        str += '\n'
        console.log(str)
    }
}

describe('all pairs shortest path', () => {
    const directedGraph = new DirectedGraph()
    SHORTEST_PATH_EDGES.forEach(edge => {
        directedGraph.addEdge(...edge)
    })
    test('going as expected', () => {
        const table = allPairsShortestPath(directedGraph)
        visualize(table)
    })
})
