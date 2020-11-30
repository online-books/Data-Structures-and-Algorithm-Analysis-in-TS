/** @format */

import Graph from './Graph'

export default class DirectedGraph extends Graph {
    constructor() {
        super()
    }

    public addEdge(fromVertex: string, toVertex: string, weight?: number): boolean {
        return super.addEdge(fromVertex, toVertex, weight)
    }

    public removeEdge(fromVertex: string, toVertex: string): boolean {
        return super.removeEdge(fromVertex, toVertex)
    }
}
