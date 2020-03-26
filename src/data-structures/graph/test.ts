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
    { from: "e", to: "f" }
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
    { from: "e", to: "f" }
  ];
  const graph = new DirectedGraph(edges);
  test("顶点的入度", () => {
    expect(graph.indegree("a")).toBe(0);
    expect(graph.indegree("b")).toBe(1);
    expect(graph.indegree("c")).toBe(2);
    expect(graph.indegree("d")).toBe(1);
    expect(graph.indegree("e")).toBe(2);
    expect(graph.indegree("f")).toBe(2);
  });
  test("拓扑排序", () => {
    expect(graph.topSort()).toStrictEqual(["a", "b", "c", "d", "e", "f"]);
  });
});

describe("最短路径算法", () => {
  test("无权最短路径", () => {
    const edges = [
      { from: "a", to: "b" },
      { from: "a", to: "c" },
      { from: "b", to: "c" },
      { from: "b", to: "d" },
      { from: "c", to: "e" },
      { from: "c", to: "f" },
      { from: "d", to: "e" },
      { from: "e", to: "f" }
    ];
    const graph = new DirectedGraph(edges);
    const result = graph.unweightedShortestPath("a");
    result.forEach(item => {
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
      { from: "g", to: "f", weight: 1 }
    ];
    const graph = new DirectedGraph(edges);
    const result = graph.dijkstra("a");
    result.forEach(item => {
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
});
describe.skip("网络流问题", () => {
  test("最大流", () => {
    const edges = [
      { from: "s", to: "a", weight: 3 },
      { from: "s", to: "b", weight: 2 },
      { from: "a", to: "b", weight: 1 },
      { from: "a", to: "c", weight: 3 },
      { from: "a", to: "d", weight: 4 },
      { from: "b", to: "d", weight: 2 },
      { from: "c", to: "t", weight: 2 },
      { from: "d", to: "t", weight: 3 }
    ];
    const graph = new DirectedGraph(edges);
    expect(graph.getMaxFlow("s", "t")).toBe(5);
  });
});

describe.skip("最小生成树", () => {
  test("prim", () => {});
  test("kruskal", () => {});
});
