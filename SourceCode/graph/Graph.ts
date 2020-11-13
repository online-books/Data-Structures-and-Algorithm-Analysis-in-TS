/** @format */

import LinkedList from '../list/linked-list/LinkedList'
import HashTable from '../hash-table/HashTable'
import GraphEdge from './GraphEdge'

export interface AdjacencyListNodeStruct {
    weight: number
    adjVex: number
}

export const enum GRAPH_TYPE {
    DIRECTED_GRAPH = 0,
    UNDIRECTED_GRAPH = 1,
}

export default abstract class Graph {
    protected adjacencyList: LinkedList<AdjacencyListNodeStruct>[]
    protected vertices: HashTable<number>
    protected type: GRAPH_TYPE
    protected vertexCount = 0
    protected init(): void {
        this.vertices = new HashTable()
        this.adjacencyList = []
    }

    protected addEdge(edge: GraphEdge): void {
        const {from, to, weight} = edge
        let fromVertexIndex = this.vertices.find(from)
        if (fromVertexIndex === null) {
            fromVertexIndex = this.vertexCount
            this.addVertex(from)
        }
        const adjacencyList = this.adjacencyList[fromVertexIndex]
        let adjVex = this.vertices.find(to)
        if (adjVex === null) {
            adjVex = this.addVertex(to)
        }
        const existedNode = adjacencyList.find(element => {
            return element.adjVex === adjVex
        })
        if (existedNode) {
            return
        }
        adjacencyList.insert({
            weight,
            adjVex,
        })
    }
    private addVertex(vertexName: string): number {
        const index = this.vertices.insert(vertexName, this.vertexCount)
        const list = new LinkedList<AdjacencyListNodeStruct>()
        list.insert({
            weight: 0,
            adjVex: index,
        })
        this.adjacencyList.push(list)
        this.vertexCount += 1
        return index
    }
}
