import Graph, { Edge, GRAPH_TYPE } from "./graph";
import BinaryHeap from "../priority-queue/binary-heap";
import DisjointSet from "../disjoint-set";

interface MinSpannningTreeEdge {
  from: string;
  to: string;
  weight: number;
}

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
  public prim(): MinSpannningTreeEdge[] {
    const { vertexList, minWeightEdge } = this;
    const result: MinSpannningTreeEdge[] = [];
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
      from: vertexIndex,
    }));
    binaryHeap.insert(list[minWeightEdge.from]);
    let edgeAccepted = 0;
    while (edgeAccepted < vertexList.length - 1) {
      const heapNode = binaryHeap.deleteMin();
      const { index, visited, value, from } = heapNode;
      if (visited) {
        continue;
      }
      const vertexNode = vertexList[index];
      // 排除起始定点
      if (value !== 0) {
        result.push({
          from: vertexList[from].name,
          to: vertexNode.name,
          weight: value,
        });
        edgeAccepted += 1;
      }
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
  public kruskal(): MinSpannningTreeEdge[] {
    const { vertexList } = this;
    const disjSet = new DisjointSet(vertexList.length);
    const edges: Array<{
      from: number;
      to: number;
      value: number;
    }> = [];
    const result: MinSpannningTreeEdge[] = [];
    vertexList.forEach((vertexNode, index) => {
      let nextNode = vertexNode.firstArc;
      while (nextNode) {
        edges.push({
          from: index,
          to: nextNode.adjVex,
          value: nextNode.weight,
        });
        nextNode = nextNode.next;
      }
    });
    const binaryHeap = BinaryHeap.create(edges);
    let edgeAccepted = 0;
    while (edgeAccepted < vertexList.length - 1) {
      const edge = binaryHeap.deleteMin();
      const fromRootIndex = disjSet.find(edge.from);
      const toRootIndex = disjSet.find(edge.to);
      if (fromRootIndex === toRootIndex) {
        continue;
      }
      disjSet.union(fromRootIndex, toRootIndex);
      edgeAccepted += 1;
      result.push({
        from: vertexList[edge.from].name,
        to: vertexList[edge.to].name,
        weight: edge.value,
      });
    }
    return result;
  }
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
    return vertexNodeIndexArr.every((val) => val === 1);
  }
}
