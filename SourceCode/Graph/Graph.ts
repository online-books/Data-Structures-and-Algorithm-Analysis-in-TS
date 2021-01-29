/** @format */

import LinkedList from '../List/LinkedList/LinkedList'
import HashTable from '../HashTable/HashTable'
import Stack from '../Stack/Stack'

export interface AdjVerticesListNodeStruct {
    weight: number
    adjVex: number
}

export default abstract class Graph {
    protected adjVerticesLists: LinkedList<AdjVerticesListNodeStruct>[]
    protected vertices: HashTable<number>
    protected indegrees: number[]
    protected outdegrees: number[]
    private vertexNames: string[]
    private vertexPool: Stack<number>
    protected constructor() {
        this.vertices = new HashTable()
        this.adjVerticesLists = []
        this.vertexNames = []
        this.indegrees = []
        this.outdegrees = []
        this.vertexPool = new Stack()
    }
    public hasVertex(vertexName: string): boolean {
        const vertexIndex = this.vertices.find(vertexName)
        if (vertexIndex === null) {
            return false
        }
        return true
    }
    public getAllVertices(): string[] {
        return this.vertexNames.filter(vertexName => vertexName)
    }
    public traverseAdjVertices(
        vertexName: string,
        callback: (adjVertexName: string, adjVertexIndex: number, adjVertexWeight: number) => void,
    ): void {
        const {vertexNames, adjVerticesLists, vertices} = this
        const vertexIndex = vertices.find(vertexName)
        if (vertexIndex !== null) {
            const verticesList = adjVerticesLists[vertexIndex]
            verticesList.traverse(element => {
                callback(vertexNames[element.adjVex], element.adjVex, element.weight)
            })
        }
    }
    public getIndegreeByVertexName(vertexName: string): number {
        const vertexIndex = this.vertices.find(vertexName)
        if (vertexIndex === null) {
            return 0
        }
        return this.indegrees[vertexIndex] || 0
    }
    public getOutdegreeByVertexName(vertexName: string): number {
        const vertexIndex = this.vertices.find(vertexName)
        if (vertexIndex === null) {
            return 0
        }
        return this.outdegrees[vertexIndex] || 0
    }

    protected removeEdge(fromVertex: string, toVertex: string): boolean {
        const headVertex = this.vertices.find(fromVertex)
        if (headVertex === null) {
            return false
        }
        const verticesList = this.adjVerticesLists[headVertex]
        const adjVex = this.vertices.find(toVertex)
        if (adjVex === null) {
            return false
        }
        const adjVertex = verticesList.find(element => {
            return element.adjVex === adjVex
        })
        if (!adjVertex) {
            return false
        }
        verticesList.delete(element => {
            return element.adjVex === adjVex
        })
        this.decreaseDegree(this.outdegrees, headVertex)
        this.decreaseDegree(this.indegrees, adjVex)
        if (this.indegrees[headVertex] + this.outdegrees[headVertex] === 0) {
            this.removeVertex(fromVertex, headVertex)
        }
        if (this.indegrees[adjVex] + this.outdegrees[adjVex] === 0) {
            this.removeVertex(toVertex, adjVex)
        }
        return true
    }

    protected addEdge(fromVertex: string, toVertex: string, weight = 1): boolean {
        const headVertex = this.getVertex(fromVertex)
        const verticesList = this.adjVerticesLists[headVertex]
        const adjVex = this.getVertex(toVertex)
        const existedVertex = verticesList.find(element => {
            return element.adjVex === adjVex
        })
        if (existedVertex) {
            return false
        }
        this.increaseDegree(this.outdegrees, headVertex)
        this.increaseDegree(this.indegrees, adjVex)
        verticesList.insert({
            weight,
            adjVex,
        })
        return true
    }
    private addVertex(vertexName: string): number {
        let vertexIndex: number
        if (!this.vertexPool.isEmpty()) {
            vertexIndex = this.vertexPool.pop()
        } else {
            vertexIndex = this.vertexNames.length
            const list = new LinkedList<AdjVerticesListNodeStruct>()
            this.adjVerticesLists.push(list)
        }
        this.vertexNames.splice(vertexIndex, 1, vertexName)
        this.vertices.insert(vertexName, vertexIndex)
        return vertexIndex
    }
    private removeVertex(vertexName: string, vertexIndex: number): void {
        this.vertices.delete(vertexName)
        this.vertexNames.splice(vertexIndex, 1, '')
        this.vertexPool.push(vertexIndex)
    }
    private getVertex(vertexName: string): number {
        let vertexIndex = this.vertices.find(vertexName)
        if (vertexIndex === null) {
            vertexIndex = this.addVertex(vertexName)
        }
        return vertexIndex
    }
    private increaseDegree(degree: number[], index: number) {
        if (degree[index] === undefined) {
            degree[index] = 0
        }
        degree[index] += 1
    }
    private decreaseDegree(degree: number[], index: number) {
        degree[index] -= 1
    }
}
