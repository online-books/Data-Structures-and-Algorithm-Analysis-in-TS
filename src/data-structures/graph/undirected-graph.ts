import Graph, { Edge, GRAPH_TYPE } from "./graph";
import BinaryHeap from "../priority-queue/binary-heap";

export default class UndirectedGraph extends Graph {
  constructor(edges: Edge[]) {
    super();
    this.type = GRAPH_TYPE.UNDIRECTED_GRAPH;
    this.init(edges);
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
  /**
   * 判断此无向图是否是连通的
   */
  public isConnected(): boolean {
    return this.vertexList.every((vNode, vIndex) => {
      return this.checkVertexNodeConnection(vIndex);
    });
  }

  /**
   * prim算法计算最小生成树
   */
  public prim(): Array<{ from: string; to: string; weight: number }> {
    const { vertexList, minWeightEdge } = this;
    const result: Array<{ from: string; to: string; weight: number }> = [];
    const binaryHeap = new BinaryHeap<{
      value: number;
      index: number;
      visited: boolean;
      from: number;
    }>();
    const list = vertexList.map((vertexNode, vertexIndex) => ({
      value: 0,
      index: vertexIndex,
      visited: false,
      from: vertexIndex
    }));
    binaryHeap.insert(list[minWeightEdge.from]);
    let nodeAccepted = 0;
    while (nodeAccepted < vertexList.length) {
      const heapNode = binaryHeap.deleteMin();
      const { index, visited, value, from } = heapNode;
      if (visited) {
        continue;
      }
      const vertexNode = vertexList[index];
      result.push({
        from: vertexList[from].name,
        to: vertexNode.name,
        weight: value
      });
      nodeAccepted += 1;
      heapNode.visited = true;
      let nextNode = vertexNode.firstArc;
      while (nextNode) {
        const item = list[nextNode.adjVex];
        if (item.value === 0 || item.value > nextNode.weight) {
          item.value = nextNode.weight;
          item.from = index;
          binaryHeap.insert(item);
        }
        nextNode = nextNode.next;
      }
    }
    return result;
  }

  /**
   * kruskal计算最小生成树
   */
  public kruskal() {}
  private checkVertexNodeConnection(vertexNodeIndex: number) {
    const { vertexList } = this;
    const vertexNodeIndexArr = new Array(vertexList.length).fill(0);
    function dfs(vNodeIndex: number) {
      vertexNodeIndexArr[vNodeIndex] = 1;
      let nextNode = vertexList[vNodeIndex].firstArc;
      while (nextNode) {
        if (!vertexNodeIndexArr[nextNode.adjVex]) {
          dfs(nextNode.adjVex);
        }
        nextNode = nextNode.next;
      }
    }
    dfs(vertexNodeIndex);
    return vertexNodeIndexArr.every(val => val === 1);
  }
}
