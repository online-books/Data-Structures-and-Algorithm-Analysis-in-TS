import Graph, { Edge, GRAPH_TYPE } from "./graph";
import BinaryHeap from "../priority-queue/binary-heap";
import DisjointSet from "../disjoint-set";
// import SingleList from "../linked-list/single-list";

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
    return this.indegreeList[vertexIndex];
  }
  /**
   * 判断此无向图是否是连通的
   */
  public isConnected(): boolean {
    const { vertexList } = this;
    const vertexNodeIndexArr = new Array(vertexList.length).fill(0);
    function dfs(vNodeIndex: number) {
      vertexNodeIndexArr[vNodeIndex] = 1;
      let edgeNode = vertexList[vNodeIndex].firstArc;
      while (edgeNode) {
        if (!vertexNodeIndexArr[edgeNode.adjVex]) {
          dfs(edgeNode.adjVex);
        }
        edgeNode = edgeNode.next;
      }
    }
    dfs(0);
    return vertexNodeIndexArr.every((val) => val === 1);
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
      let edgeNode = vertexNode.firstArc;
      while (edgeNode) {
        const item = list[edgeNode.adjVex];
        if (item.value === 0 || item.value > edgeNode.weight) {
          item.value = edgeNode.weight;
          item.from = index;
          binaryHeap.insert(item);
        }
        edgeNode = edgeNode.next;
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
      let edgeNode = vertexNode.firstArc;
      while (edgeNode) {
        edges.push({
          from: index,
          to: edgeNode.adjVex,
          value: edgeNode.weight,
        });
        edgeNode = edgeNode.next;
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

  /**
   * 深度优先搜索检测割点：若无割点，则此图是双联通的
   */
  public findArt(vertexNodeName?: string): Set<string> | null {
    const { vertexList } = this;
    const nums: number[] = [];
    const lows: number[] = [];
    const parents: number[] = [];
    const visited: number[] = new Array(vertexList.length).fill(0);
    const set: Set<string> = new Set();
    let count = 0;
    let startIndex = 0;
    let startVertexEdges = 0;
    if (vertexNodeName) {
      startIndex = this.hashTable.find(vertexNodeName);
    }
    function dfs(vertexNodeIndex: number) {
      visited[vertexNodeIndex] = 1;
      nums[vertexNodeIndex] = lows[vertexNodeIndex] = count++;
      const vertexNode = vertexList[vertexNodeIndex];
      let edgeNode = vertexNode.firstArc;
      while (edgeNode) {
        const { adjVex } = edgeNode;
        // 前向边
        if (!visited[adjVex]) {
          parents[adjVex] = vertexNodeIndex;
          dfs(adjVex);
          // 起始节点单独判断
          if (vertexNodeIndex === startIndex) {
            startVertexEdges += 1;
            // 若起始节点有多余一个儿子，则是节点
            if (startVertexEdges > 1) {
              set.add(vertexNode.name);
            }
          } else {
            if (lows[adjVex] >= nums[vertexNodeIndex]) {
              set.add(vertexNode.name);
            }
          }

          lows[vertexNodeIndex] = Math.min(lows[adjVex], lows[vertexNodeIndex]);
        } else {
          // 背向边
          if (parents[vertexNodeIndex] !== adjVex) {
            lows[vertexNodeIndex] = Math.min(
              nums[adjVex],
              lows[vertexNodeIndex]
            );
          }
        }
        edgeNode = edgeNode.next;
      }
    }
    dfs(startIndex);
    return set.size ? set : null;
  }

  /**
   * 欧拉回路
   * 充分必要条件：1.每个顶点的度都为偶数；2.图是连通的
   */
  public eulerCircuit(): string[] | null {
    const { vertexList, indegreeList } = this;
    const notVisitedEdges = this.getAllEdges();
    const path: string[] = [];
    let oddCount = 0;

    vertexList.forEach((vertexNode, vertexIndex) => {
      const degreeNumber = indegreeList[vertexIndex];
      if (degreeNumber % 2) {
        oddCount += 1;
      }
    });
    if (oddCount === 1 || oddCount > 2 || !this.isConnected()) {
      throw Error("No euler circuit exist!");
    }
    let startNodeIndex = 0;
    let backToStartNode = false;
    const dfs = (vertexNodeIndex: number) => {
      const currentVertexNode = vertexList[vertexNodeIndex];
      path.push(currentVertexNode.name);
      let edgeNode = currentVertexNode.firstArc;
      while (edgeNode) {
        if (backToStartNode) {
          return;
        }
        const { adjVex } = edgeNode;
        const edge = `${vertexNodeIndex}_${adjVex}`;
        const edgeReverse = `${adjVex}_${vertexNodeIndex}`;
        if (notVisitedEdges.has(edge)) {
          notVisitedEdges.delete(edge);
          notVisitedEdges.delete(edgeReverse);
          if (adjVex === startNodeIndex) {
            backToStartNode = true;
          }
          dfs(adjVex);
        }
        edgeNode = edgeNode.next;
      }
    };
    while (notVisitedEdges.size) {
      dfs(startNodeIndex);
    }
    return path.length ? path : null;
  }
}
