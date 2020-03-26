import Graph, { Edge, VertexNode, GRAPH_TYPE } from "./graph";
import BinaryHeap from "../priority-queue/binary-heap";

interface FlowNode {
  next: FlowNode | null;
  flow: number;
}

function checkWeight(weight: number) {
  return weight >= 0;
}

export default class DirectedGraph extends Graph {
  constructor(edges: Edge[]) {
    super();
    this.type = GRAPH_TYPE.DIRECTED_GRAPH;
    this.init(edges);
  }
  /**
   * 计算顶点入度
   * @param {strig} vertexName
   */
  public indegree(vertexName: string): number {
    const vertexIndex = this.hashTable.find(vertexName);
    return this.indegreeList[vertexIndex];
  }

  /**
   * 拓扑排序
   */
  public topSort(): string[] {
    const { indegreeList, vertexList } = this;
    const indegree = indegreeList.slice();
    const queue: number[] = [];
    const result: string[] = [];
    let count = 0;
    indegree.forEach((num, index) => {
      if (num === 0) {
        queue.push(index);
        count += 1;
      }
    });
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
      throw Error("Graph has a cycle");
    }
    return result;
  }

  /**
   * 获取图中某点到其他各点的无权最短路径
   * @param {string} vertexName
   */
  public unweightedShortestPath(
    vertexName: string
  ): Array<{ name: string; value: number }> {
    const result = [];
    const queue: Array<{
      vertexNode: VertexNode;
      value: number;
    }> = [];
    const vertexNodes = this.vertexList.map(vertexNode => {
      const data = { vertexNode, value: -1 };
      if (vertexNode.name === vertexName) {
        Object.assign(data, {
          value: 0
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

  /**
   * dijkstra算法求有向图中某点至其他各点的有(非负)权最短路径
   * @param {string} vertexName
   */
  public dijkstra(vertexName: string): Array<{ name: string; value: number }> {
    const { vertexList } = this;
    const result = [];
    const heap = new BinaryHeap();
    const list = vertexList.map(vertexNode => {
      const data = {
        vertexNode,
        value: -1,
        visited: false
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
          value
        });
        let edgeNode = vertexNode.firstArc;
        while (edgeNode) {
          const { adjVex, weight, next } = edgeNode;
          if (!checkWeight(weight)) {
            throw Error("weight is negative");
          }
          const item = list[adjVex];
          if (!item.visited) {
            if (item.value === -1 || item.value > value + weight) {
              item.value = value + weight;
              heap.insert(item);
            }
          }
          edgeNode = next;
        }
      }
    }
    return result;
  }

  /**
   * 有向图中某点至其他各点的有(包含负权回路)权最短路径
   * @param {string} vertexName
   */
  public weightedNegativeShortestPath(
    vertexName: string
  ): Array<{ name: string; value: number }> {
    const { vertexList } = this;
    const cache: { [propName: string]: number } = {};
    const queue: Array<{
      vertexNode: VertexNode;
      value: number;
      count: number;
    }> = [];
    const list = vertexList.map(vertexNode => {
      const data = {
        count: 0, // 入队次数标记，防止图中存在负值圈无限循环
        vertexNode,
        value: Number.MAX_VALUE
      };
      if (vertexNode.name === vertexName) {
        data.value = 0;
        queue.push(data);
      }
      return data;
    });
    while (queue.length) {
      const data = queue.shift()!;
      const { vertexNode, value } = data;
      data.count += 1;
      cache[vertexNode.name] = value;
      if (data.count > vertexList.length) {
        break;
      }
      let edgeNode = vertexNode.firstArc;
      while (edgeNode) {
        const nextData = list[edgeNode.adjVex];
        if (value + edgeNode.weight < nextData.value) {
          nextData.value = value + edgeNode.weight;
          if (
            queue.findIndex(
              item => item.vertexNode.name === nextData.vertexNode.name
            ) < 0
          ) {
            queue.push(nextData);
          }
        }
        edgeNode = edgeNode.next;
      }
    }
    return Object.entries(cache).map(([name, value]) => ({
      name,
      value
    }));
  }
  /**
   * 获取最大网络流
   * @param {string} startvertexName
   * @param {string} endVertexName
   */
  public getMaxFlow(startVertexName: string, endVertexName: string): number {
    let startVertexNode!: VertexNode;
    let endVertextNode!: VertexNode;
    const residualGraph: FlowNode[] = this.vertexList.map(vertexNode => {
      if (vertexNode.name === startVertexName) {
        startVertexNode = vertexNode;
      }
      if (vertexNode.name === endVertexName) {
        endVertextNode = vertexNode;
      }
      const flowNode: FlowNode = {
        next: null,
        flow: 0
      };
      let nextVertexNode = vertexNode.firstArc;
      let nextFlowNode = flowNode!;
      while (nextVertexNode) {
        nextFlowNode.flow = nextVertexNode.weight;
        nextFlowNode.next = {
          next: null,
          flow: 0
        };
        nextVertexNode = nextVertexNode.next;
        nextFlowNode = nextFlowNode.next;
      }
      return flowNode;
    });
    console.log(startVertexNode, endVertextNode);
    return residualGraph.length;
  }
}
