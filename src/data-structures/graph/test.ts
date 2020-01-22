import UndirectedGraph from './undirected-graph';
import DirectedGraph from './directed-graph';


const edges = [
    { from: 'a', to: 'b', weight: 3 },
    { from: 'a', to: 'c', weight: 6 },
    { from: 'b', to: 'c', weight: 1 },
    { from: 'b', to: 'd', weight: 2 },
    { from: 'c', to: 'e', weight: 3 },
    { from: 'c', to: 'f', weight: 5 },
    { from: 'd', to: 'e', weight: 4 },
    { from: 'e', to: 'f', weight: 2 },
];

describe('无向图', () => {
    const graph = new UndirectedGraph(6, edges);
    test('顶点的度', () => {
        expect(graph.degree('a')).toBe(2);
        expect(graph.degree('b')).toBe(3);
        expect(graph.degree('c')).toBe(4);
        expect(graph.degree('d')).toBe(2);
        expect(graph.degree('e')).toBe(3);
        expect(graph.degree('f')).toBe(2);
    })

});

describe('有向图', () => {
    const graph = new DirectedGraph(6, edges);
    test('顶点的入度', () => {
        expect(graph.indegree('a')).toBe(0);
        expect(graph.indegree('b')).toBe(1);
        expect(graph.indegree('c')).toBe(2);
        expect(graph.indegree('d')).toBe(1);
        expect(graph.indegree('e')).toBe(2);
        expect(graph.indegree('f')).toBe(2);
    });
    test('拓扑排序', () => {
        expect(graph.topSort()).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
    test('无权最短路径', () => {
        const result = graph.unweightedShortestPath('a');
        result.forEach(item => {
            switch (item.name) {
                case 'a': {
                    expect(item.value).toBe(0);
                    break;
                }
                case 'b': {
                    expect(item.value).toBe(1);
                    break;
                }
                case 'c': {
                    expect(item.value).toBe(1);
                    break;
                }
                case 'd': {
                    expect(item.value).toBe(2);
                    break;
                }
                case 'e': {
                    expect(item.value).toBe(2);
                    break;
                }
                case 'f': {
                    expect(item.value).toBe(2);
                    break;
                }
            }
        });
    });
    test('Dijkstra', () => {
        const result = graph.dijkstra('a');
        result.forEach(item => {
            switch (item.name) {
                case 'a': {
                    expect(item.value).toBe(0);
                    break;
                }
                case 'b': {
                    expect(item.value).toBe(3);
                    break;
                }
                case 'c': {
                    expect(item.value).toBe(4);
                    break;
                }
                case 'd': {
                    expect(item.value).toBe(5);
                    break;
                }
                case 'e': {
                    expect(item.value).toBe(7);
                    break;
                }
                case 'f': {
                    expect(item.value).toBe(9);
                    break;
                }
            }
        });
    });
});
