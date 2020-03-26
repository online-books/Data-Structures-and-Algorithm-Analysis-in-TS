import Graph, { Edge, GRAPH_TYPE } from "./graph";

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
  public isConnected(): boolean {
    return this.vertexList.every((vNode, vIndex) => {
      return this.checkVertexNodeConnection(vIndex);
    });
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
    return vertexNodeIndexArr.every(val => val === 1);
  }
}
