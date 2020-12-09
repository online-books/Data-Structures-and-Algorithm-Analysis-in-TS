/** @format */

import DirectedGraph from './DirectedGraph'

interface BeforeEachCallback {
    (vertexName: string, adjVertexName: string, adjVertexIndex: number): void
}

interface AfterAllCallback {
    (vertexName: string, vertexIndex: number): void
}

export default function findStrongComponents(directedGraph: DirectedGraph): string[][] {
    const {spanningForest, reversedDirectedGraph} = spanDfsForest(directedGraph)
    const vertices = reversedDirectedGraph.getAllVertices()
    const visited = new Array(vertices.length).fill(0)
    const strongComponent: string[] = []
    const result: string[][] = []
    while (spanningForest.length) {
        const spanningTree = spanningForest.pop()!
        while (spanningTree.length) {
            const vertexName = spanningTree.pop()!
            strongComponent.length = 0
            const vertexIndex = vertices.findIndex(val => val === vertexName)
            dfs(reversedDirectedGraph, visited, vertices[vertexIndex], vertexIndex, undefined, vertexName => {
                strongComponent.push(vertexName)
            })
            if (strongComponent.length) {
                result.push([...strongComponent])
            }
            strongComponent.length = 0
        }
    }
    return result
}

function spanDfsForest(
    directedGraph: DirectedGraph,
): {
    spanningForest: string[][]
    reversedDirectedGraph: DirectedGraph
} {
    const reversedDirectedGraph = new DirectedGraph()
    const vertices = directedGraph.getAllVertices()
    const visited = new Array(vertices.length).fill(0)
    const spanningForest: string[][] = []
    const spanningTree: string[] = []
    const addEdge: BeforeEachCallback = (vertexName, adjVertexName) => {
        reversedDirectedGraph.addEdge(adjVertexName, vertexName)
    }
    const addForest: AfterAllCallback = vertexName => {
        spanningTree.push(vertexName)
    }
    for (let i = 0; i < vertices.length; ) {
        spanningTree.length = 0
        dfs(directedGraph, visited, vertices[i], i, addEdge, addForest)
        spanningForest.push([...spanningTree])
        while (visited[i]) {
            i += 1
            if (i === vertices.length) {
                break
            }
        }
    }
    return {spanningForest, reversedDirectedGraph}
}

function dfs(
    directedGraph: DirectedGraph,
    visited: number[],
    vertexName: string,
    vertexIndex: number,
    beforeEach?: BeforeEachCallback,
    afterAll?: AfterAllCallback,
): void {
    if (visited[vertexIndex]) {
        return
    }
    visited[vertexIndex] = 1
    directedGraph.traverseAdjVertices(vertexName, (adjVertexName, adjVertexIndex) => {
        if (beforeEach) {
            beforeEach(vertexName, adjVertexName, adjVertexIndex)
        }
        dfs(directedGraph, visited, adjVertexName, adjVertexIndex, beforeEach, afterAll)
    })
    if (afterAll) {
        afterAll(vertexName, vertexIndex)
    }
}
