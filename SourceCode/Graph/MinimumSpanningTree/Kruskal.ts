/** @format */

import DisjointSet from '@/DisjointSet/DisjointSet'
import BinaryHeap from '@/PriorityQueue/BinaryHeap'
import {VertexHeapNode} from '../ShortestPaths/HelperClass'
import UndirectedGraph from '../UndirectedGraph'

interface DfsCallback {
    (fromVertexIndex: number, toVertexIndex: number, weight: number): void
}

export default function kruskal(undirectedGraph: UndirectedGraph): Array<[string, string, number]> {
    const vertices = undirectedGraph.getAllVertices()
    const disjointSet = new DisjointSet(vertices.length)
    const {binaryHeap, edges} = readGraphEdgesIntoHeap(undirectedGraph)
    const result: Array<[string, string, number]> = []
    let counter = 0
    while (binaryHeap.size) {
        const heapNode = binaryHeap.deleteMin()
        const edge = edges[heapNode.vertexIndex]
        const [fromVertexIndex, toVertexIndex, weight] = edge
        if (disjointSet.find(fromVertexIndex) !== disjointSet.find(toVertexIndex)) {
            disjointSet.union(fromVertexIndex, toVertexIndex)
            result.push([vertices[fromVertexIndex], vertices[toVertexIndex], weight])
            counter += 1
            if (counter === vertices.length) {
                break
            }
        }
    }
    return result
}
function readGraphEdgesIntoHeap(
    undirectedGraph: UndirectedGraph,
): {
    binaryHeap: BinaryHeap<VertexHeapNode>
    edges: Array<[number, number, number]>
} {
    const heapNodes: VertexHeapNode[] = []
    const vertices = undirectedGraph.getAllVertices()
    const visited = new Set<string>()
    const edges: Array<[number, number, number]> = []
    let index = 0
    const callback: DfsCallback = (fromVertexIndex, toVertexIndex, weight) => {
        edges.push([fromVertexIndex, toVertexIndex, weight])
        heapNodes.push(new VertexHeapNode(index, weight))
        index += 1
    }
    dfs(undirectedGraph, vertices, 0, visited, callback)
    const binaryHeap = new BinaryHeap<VertexHeapNode>(heapNodes)
    return {
        binaryHeap,
        edges,
    }
}
function dfs(
    undirectedGraph: UndirectedGraph,
    vertices: string[],
    vertexIndex: number,
    visited: Set<string>,
    callback: DfsCallback,
): void {
    const vertexName = vertices[vertexIndex]
    undirectedGraph.traverseAdjVertices(vertexName, (adjVertexName, adjVertexIndex, adjVertexWeight) => {
        const key = `${vertexIndex}-${adjVertexIndex}`
        const reverseKey = `${adjVertexIndex}-${vertexIndex}`
        if (visited.has(key) || visited.has(reverseKey)) {
            return
        }
        visited.add(key)
        visited.add(reverseKey)
        callback(vertexIndex, adjVertexIndex, adjVertexWeight)
        dfs(undirectedGraph, vertices, adjVertexIndex, visited, callback)
    })
}
