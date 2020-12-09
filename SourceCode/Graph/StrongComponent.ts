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
    const vertices = directedGraph.getAllVertices()
    const visited = new Array(vertices.length).fill(0)
    const strongComponent: string[] = []
    const result: string[][] = []
    while (spanningForest.length) {
        const spanningTree = spanningForest.pop()!
        strongComponent.length = 0
        let i = 0
        while (i < spanningTree.length) {
            const vertexIndex = spanningTree[i]
            if (vertexIndex === undefined) {
                continue
            }
            dfs(
                reversedDirectedGraph,
                visited,
                vertices[vertexIndex],
                vertexIndex,
                undefined,
                (vertexName, vertexIndex) => {
                    strongComponent.push(vertexName)
                    spanningTree.splice(vertexIndex, 1)
                },
            )
        }
        result.push([...strongComponent])
    }
    return result
}

function spanDfsForest(
    directedGraph: DirectedGraph,
): {
    spanningForest: number[][]
    reversedDirectedGraph: DirectedGraph
} {
    const reversedDirectedGraph = new DirectedGraph()
    const vertices = directedGraph.getAllVertices()
    const visited = new Array(vertices.length).fill(0)
    const spanningForest: number[][] = []
    const spanningTree: number[] = []
    const addEdge: BeforeEachCallback = (vertexName, adjVertexName, adjVertexIndex) => {
        reversedDirectedGraph.addEdge(adjVertexName, vertexName)
    }
    const addForest: AfterAllCallback = (vertexName, vertexIndex) => {
        spanningTree[vertexIndex] = vertexIndex
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
