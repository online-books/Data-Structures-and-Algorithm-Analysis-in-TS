/** @format */

import UndirectedGraph from './UndirectedGraph'

function dfs(
    undirectedGraph: UndirectedGraph,
    vertices: string[],
    startVertexIndex: number,
    currentVertexIndex: number,
    indegrees: number[],
    path: number[],
): boolean {
    const vertexName = vertices[currentVertexIndex]
    path.push(currentVertexIndex)
    if (startVertexIndex === currentVertexIndex) {
        if (!undirectedGraph.hasVertex(vertexName)) {
            return true
        }
    }
    let shouldStop = false
    undirectedGraph.traverseAdjVertices(vertexName, (adjVertexName, adjVertexIndex) => {
        if (shouldStop) {
            return
        }
        undirectedGraph.removeEdge(vertexName, adjVertexName)
        shouldStop = dfs(undirectedGraph, vertices, startVertexIndex, adjVertexIndex, indegrees, path)
    })
    return true
}

export default function eulerPath(undirectedGraph: UndirectedGraph): string[] | null {
    const vertices = undirectedGraph.getAllVertices()
    const oddDegreeVertices: number[] = []
    const indegrees: number[] = []
    vertices.forEach((vertexName, vertexIndex) => {
        const indegree = undirectedGraph.getIndegreeByVertexName(vertexName)
        indegrees.push(indegree)
        if (indegree % 2 === 1) {
            oddDegreeVertices.push(vertexIndex)
        }
    })
    const paths: number[] = []
    let startVertexIndex: number
    if (oddDegreeVertices.length === 0) {
        startVertexIndex = 0
    } else if (oddDegreeVertices.length === 2) {
        startVertexIndex = oddDegreeVertices[0]
    } else {
        return null
    }
    paths.push(startVertexIndex)
    let jointVertexIndex = 0
    while (true) {
        const currentPath: number[] = []
        dfs(undirectedGraph, vertices, paths[jointVertexIndex], paths[jointVertexIndex], indegrees, currentPath)
        if (currentPath.length > 0) {
            paths.splice(jointVertexIndex, 1, ...currentPath)
            let i = jointVertexIndex + 1
            for (; i < paths.length; i++) {
                const vertexName = vertices[paths[i]]
                if (undirectedGraph.getIndegreeByVertexName(vertexName) > 0) {
                    jointVertexIndex = i
                    break
                }
            }
            if (i === paths.length) {
                break
            }
        }
    }
    return paths.map(vertexIndex => vertices[vertexIndex])
}
