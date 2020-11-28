/** @format */

import Queue from '@/queue/Queue'
import DirectedGraph from '../DirectedGraph'

interface ShortestPathsMap {
    [propName: string]: string[]
}

export default function unWeightedShortestPaths(directedGraph: DirectedGraph, vertexName: string): ShortestPathsMap {
    const queue = new Queue<string>()
    const result: ShortestPathsMap = {}
    const visitedVertices = directedGraph.getAllVertices()
    let counter = 0
    queue.enqueue(vertexName)
    result[vertexName] = [vertexName]
    while (queue.size) {
        const curVertexName = queue.dequeue()!
        directedGraph.traverseAdjVertices(curVertexName, (adjVertexName, adjVertexIndex) => {
            if (!result[adjVertexName]) {
                result[adjVertexName] = [...result[curVertexName]].concat(adjVertexName)
                visitedVertices[adjVertexIndex] = ''
                queue.enqueue(adjVertexName)
                counter += 1
            }
        })
    }
    if (counter && counter < visitedVertices.length) {
        visitedVertices.forEach(visitedVertexName => {
            if (visitedVertexName) {
                result[visitedVertexName] = []
            }
        })
    }
    delete result[vertexName]
    return result
}
