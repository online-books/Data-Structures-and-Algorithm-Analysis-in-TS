/** @format */

import DirectedGraph from '../DirectedGraph'
import {PathCostMap} from './HelperClass'

type AllPathCostTable = (string | number)[][]

export default function allPairsShortestPath(directedGraph: DirectedGraph): AllPathCostTable {
    const vertices = directedGraph.getAllVertices()
    const {length} = vertices
    const distances: number[][] = []
    const table: AllPathCostTable = [[]]
    for (let i = 0; i < length; i++) {
        table[0][i] = vertices[i]
        distances[i] = new Array(length).fill(Infinity)
        distances[i][i] = 0
        directedGraph.traverseAdjVertices(vertices[i], (adjVertexName, adjVertexIndex, adjVertexWeight) => {
            distances[i][adjVertexIndex] = adjVertexWeight
        })
    }
    for (let k = 0; k < length; k++) {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                const updatedDistance = distances[i][k] + distances[k][j]
                if (updatedDistance < distances[i][j]) {
                    distances[i][j] = updatedDistance
                }
            }
        }
    }
    for (let i = 0; i < length; i++) {
        table[i + 1] = [vertices[i], ...distances[i]]
    }
    return table
}
