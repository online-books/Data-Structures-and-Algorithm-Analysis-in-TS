import HashTable from "../hash-table/linear-detection-hash-table";

export interface EdgeNode {
  weight: number;
  next: EdgeNode | null;
  adjVex: number;
}

export interface VertexNode {
  name: string;
  firstArc: EdgeNode | null;
}

export interface Edge {
  from: string;
  to: string;
  weight?: number;
}

export const enum GRAPH_TYPE {
  DIRECTED_GRAPH = 0,
  UNDIRECTED_GRAPH = 1
}

export default abstract class Graph {
  protected vertexList: VertexNode[];
  protected hashTable: HashTable;
  protected indegreeList: number[];
  protected type: GRAPH_TYPE;
  protected minWeightEdge: { from: number; to: number };
  protected constructor() {
    this.minWeightEdge = {
      from: 0,
      to: 0
    };
  }
  protected init(edges: Edge[]): void {
    const cache = {};
    edges.forEach(edge => {
      if (!cache[edge.from]) {
        cache[edge.from] = 1;
      }
      if (!cache[edge.to]) {
        cache[edge.to] = 1;
      }
    });
    const vertexNum = Object.keys(cache).length;
    this.hashTable = new HashTable(vertexNum);
    this.vertexList = new Array(vertexNum);
    this.indegreeList = new Array(vertexNum).fill(0);
    let minWeight = Number.MAX_VALUE;
    edges.forEach(edge => {
      const { from, to, weight = 1 } = edge;
      const { fromVertexIndex, toVertexIndex } = this.addEdge(from, to, weight);
      if (minWeight > weight) {
        minWeight = weight;
        Object.assign(this.minWeightEdge, {
          from: fromVertexIndex,
          to: toVertexIndex
        });
      }
      if (this.type === GRAPH_TYPE.UNDIRECTED_GRAPH) {
        this.addEdge(to, from, weight);
      }
    });
  }

  protected addEdge(
    from: string,
    to: string,
    weight: number
  ): { fromVertexIndex: number; toVertexIndex: number } {
    const { vertexList, hashTable, indegreeList } = this;
    const fromVertexIndex = hashTable.insert(from);
    const toVertexIndex = hashTable.insert(to);
    const edgeNode = {
      weight,
      next: null,
      adjVex: toVertexIndex
    };
    if (!vertexList[fromVertexIndex]) {
      vertexList[fromVertexIndex] = {
        name: from,
        firstArc: null
      };
    }
    if (!vertexList[toVertexIndex]) {
      vertexList[toVertexIndex] = {
        name: to,
        firstArc: null
      };
    }
    const vertexNode = vertexList[fromVertexIndex];
    if (!vertexNode.firstArc) {
      vertexNode.firstArc = edgeNode;
    } else {
      let next = vertexNode.firstArc;
      while (next.next) {
        next = next.next;
      }
      next.next = edgeNode;
    }
    indegreeList[toVertexIndex] += 1;
    return {
      fromVertexIndex,
      toVertexIndex
    };
  }
}
