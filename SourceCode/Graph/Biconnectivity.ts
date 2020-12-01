/** @format */

import UndirectedGraph from './UndirectedGraph'

let counter = 1

export default function findArticulationPoints(undirectedGraph: UndirectedGraph): string[] {
    const vertices = undirectedGraph.getAllVertices()
    const {length} = vertices
    const visited = new Array(length).fill(0)
    const parents = new Array(length).fill(0)
    const nums = new Array(length).fill(0)
    const lows = new Array(length).fill(0)
    const articulationPoints: string[] = []
    counter = 1
    dfs(undirectedGraph, vertices, 0, visited, parents, nums, lows, articulationPoints)
    return articulationPoints
}

function dfs(
    undirectedGraph: UndirectedGraph,
    vertices: string[],
    vertexIndex: number,
    visited: number[],
    parents: number[],
    nums: number[],
    lows: number[],
    articulationPoints: string[],
): void {
    visited[vertexIndex] = 1
    nums[vertexIndex] = lows[vertexIndex] = counter // rule 1
    counter += 1
    const vertexName = vertices[vertexIndex]
    undirectedGraph.traverseAdjVertices(vertexName, (adjVertexName, adjVertexIndex) => {
        if (!visited[adjVertexIndex]) {
            parents[adjVertexIndex] = vertexIndex
            dfs(undirectedGraph, vertices, adjVertexIndex, visited, parents, nums, lows, articulationPoints)
            lows[vertexIndex] = Math.min(lows[vertexIndex], lows[adjVertexIndex]) // rule 3
            if (lows[adjVertexIndex] >= nums[vertexIndex]) {
                if (vertexIndex > 0) {
                    articulationPoints.push(vertexName)
                }
            }
        } else if (parents[vertexIndex] !== adjVertexIndex) {
            lows[vertexIndex] = Math.min(lows[vertexIndex], nums[adjVertexIndex]) // rule 2
        }
    })
}
