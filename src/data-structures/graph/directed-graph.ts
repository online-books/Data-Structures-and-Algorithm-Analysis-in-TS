import Graph, { Edge } from './graph';

export default class DirectedGraph extends Graph {

    protected init(edges: Edge[]) {
        edges.forEach(edge => this.addEdge(edge.from, edge.to, edge.weight));
    }
    public indegree(vertexName: string): number {
        const vertexIndex = this.hashTable.find(vertexName);
        return this.indegreeList[vertexIndex];
    }
}