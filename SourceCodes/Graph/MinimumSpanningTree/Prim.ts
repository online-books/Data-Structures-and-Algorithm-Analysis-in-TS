/** @format */

import BinaryHeap from '@/PriorityQueue/BinaryHeap'
import {VertexHeapNode} from '../ShortestPaths/HelperClass'
import UnDirectedGraph from '../UndirectedGraph'

export default function prim(graph: UnDirectedGraph): Array<[string, string, number]> {
    const vertices = graph.getAllVertices()
    const visited = new Array(vertices.length).fill(0)
    const distances = new Array(vertices.length).fill(Infinity)
    const parents = new Array(vertices.length).fill(0)
    const binaryHeap = new BinaryHeap<VertexHeapNode>()
    binaryHeap.insert(new VertexHeapNode(0, 0))
    const edges: Array<[string, string, number]> = []
    while (binaryHeap.size) {
        const currentVertex = binaryHeap.deleteMin()
        if (visited[currentVertex.vertexIndex]) {
            continue
        }
        const currentVertexName = vertices[currentVertex.vertexIndex]
        const parentVertexIndex = parents[currentVertex.vertexIndex]
        visited[currentVertex.vertexIndex] = 1
        if (parentVertexIndex !== currentVertex.vertexIndex) {
            const parentVertexName = vertices[parentVertexIndex]
            edges.push([parentVertexName, currentVertexName, currentVertex.distance])
        }
        graph.traverseAdjVertices(currentVertexName, (adjVertexName, adjVertexIndex, adjVertexWeight) => {
            if (distances[adjVertexIndex] > adjVertexWeight) {
                distances[adjVertexIndex] = adjVertexWeight
                parents[adjVertexIndex] = currentVertex.vertexIndex
                binaryHeap.insert(new VertexHeapNode(adjVertexIndex, adjVertexWeight))
            }
        })
    }
    return edges
}
