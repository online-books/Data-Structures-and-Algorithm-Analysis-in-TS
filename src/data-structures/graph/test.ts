import UndirectedGraph from "./undirected-graph";
import DirectedGraph from "./directed-graph";

describe("无向图", () => {
  const edges = [
    { from: "a", to: "b" },
    { from: "a", to: "c" },
    { from: "b", to: "c" },
    { from: "b", to: "d" },
    { from: "c", to: "e" },
    { from: "c", to: "f" },
    { from: "d", to: "e" },
    { from: "e", to: "f" },
  ];
  const graph = new UndirectedGraph(edges);
  test("顶点的度", () => {
    expect(graph.degree("a")).toBe(2);
    expect(graph.degree("b")).toBe(3);
    expect(graph.degree("c")).toBe(4);
    expect(graph.degree("d")).toBe(2);
    expect(graph.degree("e")).toBe(3);
    expect(graph.degree("f")).toBe(2);
  });
  test("连通性", () => {
    expect(graph.isConnected()).toBeTruthy();
  });
  const edges1 = [
    { from: "a", to: "b", weight: 2 },
    { from: "a", to: "c", weight: 4 },
    { from: "a", to: "d", weight: 1 },
    { from: "b", to: "e", weight: 10 },
    { from: "b", to: "d", weight: 3 },
    { from: "c", to: "d", weight: 2 },
    { from: "c", to: "f", weight: 5 },
    { from: "d", to: "f", weight: 8 },
    { from: "d", to: "g", weight: 4 },
    { from: "d", to: "e", weight: 7 },
    { from: "e", to: "g", weight: 6 },
    { from: "f", to: "g", weight: 1 },
  ];
  test("prim", () => {
    const undirectedGraph = new UndirectedGraph(edges1);
    const minSpanningTree = undirectedGraph.prim();
    expect(minSpanningTree.length).toBe(6);
    const sum = minSpanningTree.reduce((prev, next) => {
      return prev + next.weight;
    }, 0);
    expect(sum).toBe(16);
  });
  test("kruskal", () => {
    const undirectedGraph = new UndirectedGraph(edges1);
    const minSpanningTree = undirectedGraph.kruskal();
    expect(minSpanningTree.length).toBe(6);
    const sum = minSpanningTree.reduce((prev, next) => {
      return prev + next.weight;
    }, 0);
    expect(sum).toBe(16);
  });
  const edges2 = [
    { from: "a", to: "b" },
    { from: "a", to: "d" },
    { from: "a", to: "e" },
    { from: "b", to: "d" },
    { from: "b", to: "c" },
    { from: "c", to: "e" },
    { from: "c", to: "d" },
  ];
  const graph2 = new UndirectedGraph(edges2);
  const edges3 = [
    { from: "a", to: "b" },
    { from: "a", to: "d" },
    { from: "b", to: "c" },
    { from: "c", to: "d" },
    { from: "c", to: "g" },
    { from: "d", to: "e" },
    { from: "d", to: "f" },
  ];
  const graph3 = new UndirectedGraph(edges3);
  test("biconnected", () => {
    const artPoints1 = graph2.findArt();
    expect(artPoints1).toBeNull();
    const artPoints2 = graph3.findArt();
    expect(artPoints2).not.toBeNull();
    expect(artPoints2!.size).toBe(2);
    expect(artPoints2).toContain("c");
    expect(artPoints2).toContain("d");
  });
  test.skip("Euler Circuit", () => {
    expect(graph2.eulerCircuit).toThrowError();
    expect(graph3.eulerCircuit).toThrowError();
    const edges = [
      { from: "a", to: "c" },
      { from: "a", to: "d" },
      { from: "b", to: "c" },
      { from: "b", to: "h" },
      { from: "c", to: "d" },
      { from: "c", to: "f" },
      { from: "c", to: "g" },
      { from: "c", to: "i" },
      { from: "d", to: "e" },
      { from: "d", to: "g" },
      { from: "d", to: "j" },
      { from: "d", to: "k" },
      { from: "e", to: "j" },
      { from: "f", to: "i" },
      { from: "g", to: "i" },
      { from: "g", to: "j" },
      { from: "f", to: "j" },
      { from: "h", to: "i" },
      { from: "i", to: "l" },
      { from: "i", to: "j" },
      { from: "j", to: "k" },
    ];
    const graph = new UndirectedGraph(edges);
    expect(graph.eulerCircuit()).toBe(["a", "b", "c"]);
  });
});

describe("有向图", () => {
  const edges = [
    { from: "a", to: "b" },
    { from: "a", to: "c" },
    { from: "b", to: "c" },
    { from: "b", to: "d" },
    { from: "c", to: "e" },
    { from: "c", to: "f" },
    { from: "d", to: "e" },
    { from: "e", to: "f" },
  ];
  test("顶点的入度", () => {
    const graph = new DirectedGraph(edges);
    expect(graph.indegree("a")).toBe(0);
    expect(graph.indegree("b")).toBe(1);
    expect(graph.indegree("c")).toBe(2);
    expect(graph.indegree("d")).toBe(1);
    expect(graph.indegree("e")).toBe(2);
    expect(graph.indegree("f")).toBe(2);
  });
  test("拓扑排序", () => {
    const graph = new DirectedGraph(edges);
    expect(graph.topSort()).toStrictEqual(["a", "b", "d", "c", "e", "f"]);
  });
  test("无权最短路径", () => {
    const edges = [
      { from: "a", to: "b" },
      { from: "a", to: "c" },
      { from: "b", to: "c" },
      { from: "b", to: "d" },
      { from: "c", to: "e" },
      { from: "c", to: "f" },
      { from: "d", to: "e" },
      { from: "e", to: "f" },
    ];
    const graph = new DirectedGraph(edges);
    const result = graph.unweightedShortestPath("a");
    result.forEach((item) => {
      switch (item.name) {
        case "a": {
          expect(item.value).toBe(0);
          break;
        }
        case "b": {
          expect(item.value).toBe(1);
          break;
        }
        case "c": {
          expect(item.value).toBe(1);
          break;
        }
        case "d": {
          expect(item.value).toBe(2);
          break;
        }
        case "e": {
          expect(item.value).toBe(2);
          break;
        }
        case "f": {
          expect(item.value).toBe(2);
          break;
        }
      }
    });
  });
  test("Dijkstra", () => {
    const edges = [
      { from: "a", to: "b", weight: 2 },
      { from: "a", to: "d", weight: 1 },
      { from: "b", to: "d", weight: 3 },
      { from: "b", to: "e", weight: 10 },
      { from: "c", to: "a", weight: 4 },
      { from: "c", to: "f", weight: 5 },
      { from: "d", to: "c", weight: 2 },
      { from: "d", to: "e", weight: 2 },
      { from: "d", to: "f", weight: 8 },
      { from: "d", to: "g", weight: 4 },
      { from: "e", to: "g", weight: 6 },
      { from: "g", to: "f", weight: 1 },
    ];
    const graph = new DirectedGraph(edges);
    const result = graph.dijkstra("a");
    result.forEach((item) => {
      switch (item.name) {
        case "a": {
          expect(item.value).toBe(0);
          break;
        }
        case "b": {
          expect(item.value).toBe(2);
          break;
        }
        case "c": {
          expect(item.value).toBe(3);
          break;
        }
        case "d": {
          expect(item.value).toBe(1);
          break;
        }
        case "e": {
          expect(item.value).toBe(3);
          break;
        }
        case "f": {
          expect(item.value).toBe(6);
          break;
        }
        case "g": {
          expect(item.value).toBe(5);
          break;
        }
      }
    });
  });
  test.skip("最大流", () => {
    const edges = [
      { from: "s", to: "a", weight: 3 },
      { from: "s", to: "b", weight: 2 },
      { from: "a", to: "b", weight: 1 },
      { from: "a", to: "c", weight: 3 },
      { from: "a", to: "d", weight: 4 },
      { from: "b", to: "d", weight: 2 },
      { from: "c", to: "t", weight: 2 },
      { from: "d", to: "t", weight: 3 },
    ];
    const graph = new DirectedGraph(edges);
    expect(graph.getMaxFlow("s", "t")).toBe(5);
  });
  test.skip("强连通性", () => {
    const edges = [
      { from: "a", to: "b" },
      { from: "a", to: "d" },
      { from: "b", to: "c" },
      { from: "b", to: "f" },
      { from: "c", to: "a" },
      { from: "c", to: "d" },
      { from: "c", to: "e" },
      { from: "d", to: "e" },
      { from: "f", to: "c" },
      { from: "g", to: "f" },
      { from: "g", to: "h" },
      { from: "h", to: "f" },
      { from: "h", to: "j" },
      { from: "j", to: "i" },
      { from: "i", to: "h" },
    ];
    const graph = new DirectedGraph(edges);
    expect(graph.isStronglyConnected()).toBeFalsy();
  });
});
