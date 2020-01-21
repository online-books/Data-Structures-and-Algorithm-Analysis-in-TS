import Graph, { Edge } from './graph';

export default class UndirectedGraph extends Graph {
    protected init(edges: Edge[]) {
        edges.forEach(edge => {
            this.addEdge(edge.from, edge.to, edge.weight);
            this.addEdge(edge.to, edge.from, edge.weight);
        });
    }
    public degree(vertexName: string): number {
        const vertexIndex = this.hashTable.find(vertexName);
        let edgeNode = this.vertexList[vertexIndex].firstArc;
        let count = 0;
        while (edgeNode) {
            edgeNode = edgeNode.next;
            count += 1;
        }
        return count;
    }
}