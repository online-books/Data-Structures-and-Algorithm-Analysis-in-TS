import Graph, { Edge, VertexNode } from './graph';

export default class DirectedGraph extends Graph {

    protected init(edges: Edge[]) {
        edges.forEach(edge => this.addEdge(edge.from, edge.to, edge.weight));
    }
    public indegree(vertexName: string): number {
        const vertexIndex = this.hashTable.find(vertexName);
        return this.indegreeList[vertexIndex];
    }
    public topSort(): string[] {
        const {
            indegreeList,
            vertexList,
        } = this;
        const indegree = indegreeList.slice();
        const queue: number[] = [];
        const result: string[] = [];
        let count = 0;
        indegree.forEach((num, index) => {
            if (num === 0) {
                queue.push(index);
                count += 1;
            }
        })
        while (queue.length) {
            const index = queue.shift()!;
            const vertexNode = vertexList[index];
            result.push(vertexNode.name);
            let edgeNode = vertexNode.firstArc;
            while (edgeNode) {
                indegree[edgeNode.adjVex] -= 1;
                if (indegree[edgeNode.adjVex] === 0) {
                    queue.push(edgeNode.adjVex);
                    count += 1;
                }
                edgeNode = edgeNode.next;
            }
        }
        if (count !== vertexList.length) {
            throw Error('Graph has a cycle');
        }
        return result
    }
    public unweightedShortestPath(vertexName: string): Array<{ name: string, path: number }> {
        const result = [];
        const queue: Array<{ vertexNode: VertexNode, path: number }> = [];
        const vertexNodes = this.vertexList.map(vertexNode => {
            const data = { vertexNode, path: -1 };
            if (vertexNode.name === vertexName) {
                Object.assign(data, {
                    path: 0,
                });
                queue.push(data);
            }
            return data;
        });
        while (queue.length) {
            const data = queue.shift()!;
            result.push({
                name: data.vertexNode.name,
                path: data.path
            });
            let nextNode = data.vertexNode.firstArc;
            while (nextNode) {
                const nextData = vertexNodes[nextNode.adjVex];
                if (nextData.path === -1) {
                    nextData.path = data.path + 1;
                    queue.push(nextData);
                }
                nextNode = nextNode.next;
            }
        }
        return result;
    }
}