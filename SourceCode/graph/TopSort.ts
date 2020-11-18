/** @format */

import Queue from '@/queue/Queue'
import DirectedGraph from './DirectedGraph'

export default function topSort(directedGraph: DirectedGraph): string[] {
    const vertices = directedGraph.getAllVertices()
    const queue = new Queue<string>()
    const result: string[] = []
    const indegrees: number[] = []
    let counter = 0
    vertices.forEach(vertexName => {
        const indegree = directedGraph.getIndegreeByVertexName(vertexName)
        if (indegree === 0) {
            queue.enqueue(vertexName)
        }
        indegrees.push(indegree)
    })
    while (queue.size) {
        const vertexName = queue.dequeue()!
        result.push(vertexName)
        counter += 1
        directedGraph.traverseAdjVertices(vertexName, (adjVertexName, adjVertexIndex) => {
            indegrees[adjVertexIndex] -= 1
            if (indegrees[adjVertexIndex] === 0) {
                queue.enqueue(adjVertexName)
            }
        })
    }
    if (counter !== vertices.length) {
        throw new Error('Graph has a circle')
    }
    return result
}
