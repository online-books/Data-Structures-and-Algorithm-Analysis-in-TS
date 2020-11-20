/** @format */

import BinaryHeap from '@/priority-queue/BinaryHeap'
import DirectedGraph from '../DirectedGraph'

interface PathCostMap {
    [propName: string]: {
        path: string[]
        distance: number
    }
}
class VertexHeapNode extends Object {
    constructor(public vertexIndex: number, public distance: number) {
        super()
        this.vertexIndex = vertexIndex
        this.distance = distance
    }
    public valueOf(): number {
        return this.distance
    }
}

export default function dijkstra(directedGraph: DirectedGraph, vertexName: string): PathCostMap | null {
    const vertices = directedGraph.getAllVertices()
    const result: PathCostMap = {}
    const startVertexIndex = vertices.findIndex(vertex => vertexName === vertex)
    if (startVertexIndex === -1) {
        return null
    }
    const heap = new BinaryHeap<VertexHeapNode>()
    const distances = new Array(vertices.length).fill(Infinity)
    const visited = new Array(vertices.length).fill(0)
    const parents = new Array(vertices.length).fill(startVertexIndex)
    heap.insert(new VertexHeapNode(startVertexIndex, 0))
    distances[startVertexIndex] = 0
    result[vertexName] = {path: [], distance: 0}
    let counter = 0
    while (heap.size) {
        if (counter === vertices.length) {
            break
        }
        const currentVertex = heap.deleteMin()
        if (visited[currentVertex.vertexIndex] === 0) {
            const currentVertexName = vertices[currentVertex.vertexIndex]
            const parentVertexIndex = parents[currentVertex.vertexIndex]
            const parentVertexName = vertices[parentVertexIndex]
            result[currentVertexName] = {
                path: result[parentVertexName].path.concat(currentVertexName),
                distance: distances[currentVertex.vertexIndex],
            }
            const currentDistance = distances[currentVertex.vertexIndex]
            visited[currentVertex.vertexIndex] = 1
            counter += 1
            directedGraph.traverseAdjVertices(currentVertexName, (adjVertexName, adjVertexIndex, adjVertexWeight) => {
                if (adjVertexWeight < 0) {
                    throw new Error('negative weight is invalid')
                }
                const updatedDistance = currentDistance + adjVertexWeight
                if (updatedDistance < distances[adjVertexIndex]) {
                    heap.insert(new VertexHeapNode(adjVertexIndex, updatedDistance))
                    parents[adjVertexIndex] = currentVertex.vertexIndex
                    distances[adjVertexIndex] = updatedDistance
                }
            })
        }
    }
    return result
}
