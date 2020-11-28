/** @format */

import Queue from '@/Queue/Queue'
import DirectedGraph from '../DirectedGraph'
import {PathCostMap} from './HelperClass'

export default function weightedNegativeShortestPaths(
    directedGraph: DirectedGraph,
    vertexName: string,
): PathCostMap | null {
    const vertices: string[] = directedGraph.getAllVertices()
    const startVertexIndex = vertices.findIndex(vertex => vertex === vertexName)
    if (startVertexIndex === -1) {
        return null
    }
    const queue = new Queue<number>()
    const result: PathCostMap = {}
    const distances = new Array(vertices.length).fill(Infinity)
    const parents = new Array(vertices.length).fill(startVertexIndex)
    const visited = new Array(vertices.length).fill(0)
    distances[startVertexIndex] = 0
    queue.enqueue(startVertexIndex)
    result[vertexName] = {path: [], distance: 0}
    while (queue.size) {
        const currentVertexIndex = queue.dequeue()!
        if (visited[currentVertexIndex] > vertices.length) {
            break
        }
        visited[currentVertexIndex] += 1
        const currentVertexName = vertices[currentVertexIndex]
        const parentVertexName = vertices[parents[currentVertexIndex]]
        result[currentVertexName] = {
            distance: distances[currentVertexIndex],
            path: result[parentVertexName].path.concat(currentVertexName),
        }
        directedGraph.traverseAdjVertices(currentVertexName, (adjVertexName, adjVertexIndex, adjVertexWeight) => {
            const updatedDistance = distances[currentVertexIndex] + adjVertexWeight
            if (distances[adjVertexIndex] > updatedDistance) {
                parents[adjVertexIndex] = currentVertexIndex
                distances[adjVertexIndex] = updatedDistance
                if (!queue.exist(adjVertexIndex)) {
                    queue.enqueue(adjVertexIndex)
                }
            }
        })
    }
    return result
}
