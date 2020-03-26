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
    if (this.type === GRAPH_TYPE.UNDIRECTED_GRAPH) {
      edges.forEach(edge => {
        this.addEdge(edge.from, edge.to);
        this.addEdge(edge.to, edge.from);
      });
    } else {
      edges.forEach(edge => this.addEdge(edge.from, edge.to, edge.weight));
    }
  }

  protected addEdge(from: string, to: string, weight = 1) {
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
  }
}
