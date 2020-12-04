/** @format */

import eulerPath from '@/Graph/EulerPath'
import UndirectedGraph from '@/Graph/UndirectedGraph'
import {EULER_PATH_EDGES} from './EdgeData'

describe('Euler Path', () => {
    test('a graph with an Euler path', () => {
        const undirectedGraph = new UndirectedGraph()
        EULER_PATH_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        const path = eulerPath(undirectedGraph)
        expect(path).not.toBeNull()
        expect(path!.length).toBe(11)
    })
    test('a graph with an Euler circuit', () => {
        const undirectedGraph = new UndirectedGraph()
        EULER_PATH_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        undirectedGraph.addEdge('d', 'g')
        undirectedGraph.addEdge('e', 'g')
        const path = eulerPath(undirectedGraph)
        expect(path).not.toBeNull()
        expect(path!.length).toBe(13)
    })
    test('a graph without an Euler path after remove several edges', () => {
        const undirectedGraph = new UndirectedGraph()
        EULER_PATH_EDGES.forEach(edge => {
            undirectedGraph.addEdge(...edge)
        })
        undirectedGraph.removeEdge('a', 'b')
        undirectedGraph.removeEdge('a', 'c')
        const path = eulerPath(undirectedGraph)
        expect(path).toBeNull()
    })
})
