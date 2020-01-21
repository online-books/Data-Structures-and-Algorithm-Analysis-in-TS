import UndirectedGraph from './undirected-graph';
import DirectedGraph from './directed-graph';


const vertexes = ['a', 'b', 'c', 'd', 'e', 'f'];
const edges = [
    { from: 'a', to: 'b', weight: 3 },
    { from: 'a', to: 'c', weight: 2 },
    { from: 'b', to: 'c', weight: 2 },
    { from: 'b', to: 'd', weight: 2 },
    { from: 'c', to: 'e', weight: 2 },
    { from: 'c', to: 'f', weight: 2 },
    { from: 'd', to: 'e', weight: 2 },
    { from: 'e', to: 'f', weight: 2 },
];

describe('无向图', () => {
    const graph = new UndirectedGraph(vertexes, edges);
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
    const graph = new DirectedGraph(vertexes, edges);
    test('顶点的入度', () => {
        expect(graph.indegree('a')).toBe(0);
        expect(graph.indegree('b')).toBe(1);
        expect(graph.indegree('c')).toBe(2);
        expect(graph.indegree('d')).toBe(1);
        expect(graph.indegree('e')).toBe(2);
        expect(graph.indegree('f')).toBe(2);
    })
});
