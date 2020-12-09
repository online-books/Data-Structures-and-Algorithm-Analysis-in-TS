/** @format */

import DirectedGraph from '@/Graph/DirectedGraph'
import findStrongComponents from '@/Graph/StrongComponent'
import {STRONG_BRANCH_EDGES} from './EdgeData'

test('Finding strong cmponents', () => {
    const directedGraph = new DirectedGraph()
    STRONG_BRANCH_EDGES.forEach(edge => {
        directedGraph.addEdge(...edge)
    })
    const result = findStrongComponents(directedGraph)
    expect(result).toStrictEqual([['g'], ['j', 'i', 'h'], ['b', 'f', 'c', 'a'], ['d'], ['e']])
})
