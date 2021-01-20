/** @format */

import DirectedGraph from './DirectedGraph'

interface PathFlowMap {
    [propName: string]: {
        paths: string[][]
        flows: number[][]
    }
}

export function copyDirectedGraph(directedGraph: DirectedGraph): DirectedGraph {
    const duplicateGraph = new DirectedGraph()
    const vertices = directedGraph.getAllVertices()
    vertices.forEach(vertexName => {
        directedGraph.traverseAdjVertices(vertexName, (adjVertexName, adjVertexIndex, adjVertexWeight) => {
            duplicateGraph.addEdge(vertexName, adjVertexName, adjVertexWeight)
        })
    })
    return duplicateGraph
}

function dfs(
    directedGraph: DirectedGraph,
    currentVertex: string,
    sinkVertex: string,
    visited: number[],
    paths: string[][],
    flows: number[][],
    pathFlowMap: PathFlowMap,
): boolean {
    if (currentVertex === sinkVertex) {
        flows.push([])
        paths.push([currentVertex])
        return true
    }
    let currentPaths: string[][]
    let currentFlows: number[][]
    if (pathFlowMap[currentVertex]) {
        currentPaths = pathFlowMap[currentVertex].paths
        currentFlows = pathFlowMap[currentVertex].flows
    } else {
        currentPaths = []
        currentFlows = []
        directedGraph.traverseAdjVertices(currentVertex, (adjVertexName, adjVertexIndex, adjVertexWeight) => {
            if (visited[adjVertexIndex]) {
                return
            }
            const flow: number[][] = []
            visited[adjVertexIndex] = 1
            const isValid = dfs(directedGraph, adjVertexName, sinkVertex, visited, currentPaths, flow, pathFlowMap)
            if (isValid) {
                for (let i = 0; i < flow.length; i++) {
                    flow[i] = [adjVertexWeight].concat(flow[i])
                    currentFlows.push(flow[i])
                }
            }
            visited[adjVertexIndex] = 0
        })
        pathFlowMap[currentVertex] = {
            paths: currentPaths,
            flows: currentFlows,
        }
    }
    currentPaths.forEach(currentPath => {
        paths.push([currentVertex].concat(currentPath))
    })
    currentFlows.forEach(currentWeight => {
        flows.push(currentWeight.slice())
    })
    return currentPaths.length > 0
}

export function searchMaxAugmentingPath(
    directedGraph: DirectedGraph,
    sourceVertex: string,
    sinkVertex: string,
): {path: string[]; flow: number[]; weight: number} {
    const paths: string[][] = []
    const flows: number[][] = []
    const pathFlowMap: PathFlowMap = {}
    const vertices = directedGraph.getAllVertices()
    const visited = vertices.map(vertexName => {
        if (vertexName === sourceVertex) {
            return 1
        } else {
            return 0
        }
    })
    dfs(directedGraph, sourceVertex, sinkVertex, visited, paths, flows, pathFlowMap)
    let maxWeight = 0
    let maxPathIndex = 0
    for (let i = 0; i < flows.length; i++) {
        const flow = flows[i]
        let minWeight = Infinity
        for (let j = 0; j < flow.length; j++) {
            if (minWeight > flow[j]) {
                minWeight = flow[j]
            }
        }
        if (maxWeight < minWeight) {
            maxWeight = minWeight
            maxPathIndex = i
        }
    }
    const path = paths[maxPathIndex] || []
    const flow = flows[maxPathIndex] || []
    return {
        path,
        flow,
        weight: maxWeight,
    }
}

export default function maximumFlow(directedGraph: DirectedGraph, sourceVertex: string, sinkVertex: string): number {
    // 构造残余图
    const residualGraph = copyDirectedGraph(directedGraph)
    let result = 0
    while (true) {
        // 寻找增广路径
        const {path, flow, weight} = searchMaxAugmentingPath(residualGraph, sourceVertex, sinkVertex)
        if (!path.length) {
            break
        }
        for (let i = 1; i < path.length; i++) {
            const fromVertexName = path[i - 1]
            const toVertexName = path[i]
            residualGraph.removeEdge(fromVertexName, toVertexName)
            residualGraph.addEdge(toVertexName, fromVertexName, weight)
            if (flow[i - 1] > weight) {
                residualGraph.addEdge(fromVertexName, toVertexName, flow[i - 1] - weight)
            }
        }
        result += weight
    }

    return result
}
