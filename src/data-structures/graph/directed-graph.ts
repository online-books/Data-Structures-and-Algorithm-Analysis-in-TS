import Graph, { Edge, VertexNode } from './graph';
import BinaryHeap from '../priority-queue/binary-heap';

export default class DirectedGraph extends Graph {

    protected init(edges: Edge[]) {
        edges.forEach(edge => this.addEdge(edge.from, edge.to, edge.weight));
    }
    // 计算顶点入度
    public indegree(vertexName: string): number {
        const vertexIndex = this.hashTable.find(vertexName);
        return this.indegreeList[vertexIndex];
    }
    // 拓扑排序
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
    // 无权最短路径
    public unweightedShortestPath(vertexName: string): Array<{ name: string, value: number }> {
        const result = [];
        const queue: Array<{ vertexNode: VertexNode, value: number }> = [];
        const vertexNodes = this.vertexList.map(vertexNode => {
            const data = { vertexNode, value: -1 };
            if (vertexNode.name === vertexName) {
                Object.assign(data, {
                    value: 0,
                });
                queue.push(data);
            }
            return data;
        });
        while (queue.length) {
            const data = queue.shift()!;
            result.push({
                name: data.vertexNode.name,
                value: data.value
            });
            let nextNode = data.vertexNode.firstArc;
            while (nextNode) {
                const nextData = vertexNodes[nextNode.adjVex];
                if (nextData.value === -1) {
                    nextData.value = data.value + 1;
                    queue.push(nextData);
                }
                nextNode = nextNode.next;
            }
        }
        return result;
    }
    // dijkstra算法求有(非负)权最短路径
    public dijkstra(vertexName: string): Array<{ name: string, value: number }> {
        const {
            vertexList,
        } = this;
        const result = [];
        const heap = new BinaryHeap();
        const list = vertexList.map(vertexNode => {
            const data = {
                vertexNode,
                value: -1,
                visited: false,
            };
            if (vertexNode.name === vertexName) {
                data.value = 0;
                heap.insert(data);
            }
            return data;
        });
        while (!heap.isEmpty()) {
            const data = heap.deleteMin();
            const { vertexNode, value, visited } = data;
            if (!visited) {
                data.visited = true;
                result.push({
                    name: vertexNode.name,
                    value,
                });
                let edgeNode = vertexNode.firstArc;
                while (edgeNode) {
                    const item = list[edgeNode.adjVex];
                    if (!item.visited) {
                        if (item.value === -1 || item.value > (value + edgeNode.weight)) {
                            item.value = value + edgeNode.weight;
                            heap.insert(item);
                        }
                    }
                    edgeNode = edgeNode.next;
                }
            }
        }
        return result;
    }
}