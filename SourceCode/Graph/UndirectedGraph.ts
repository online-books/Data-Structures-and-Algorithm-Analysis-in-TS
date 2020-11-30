/** @format */

import Graph from './Graph'

export default class UndirectedGraph extends Graph {
    constructor() {
        super()
    }

    public addEdge(fromVertex: string, toVertex: string, weight?: number): boolean {
        if (fromVertex === toVertex) {
            return false
        }
        const result = super.addEdge(fromVertex, toVertex, weight)
        if (!result) {
            return false
        }
        super.addEdge(toVertex, fromVertex, weight)
        return true
    }
    public removeEdge(fromVertex: string, toVertex: string): boolean {
        if (fromVertex === toVertex) {
            return false
        }
        const result = super.removeEdge(fromVertex, toVertex)
        if (!result) {
            return false
        }
        super.removeEdge(toVertex, fromVertex)
        return true
    }
}
