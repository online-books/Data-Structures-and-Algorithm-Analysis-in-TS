import HashTable from '../hash-table/linear-detection-hash-table';

export interface EdgeNode {
    weight: number;
    next: EdgeNode | null;
    adjVex: number;
}

export interface VertexNode {
    index: number;
    name: string;
    firstArc: EdgeNode | null;
}

export interface Edge {
    from: string;
    to: string;
    weight: number;
}

function checkEdge(edge: Edge) {
    const {
        from,
        to,
        weight
    } = edge;
    if (typeof from === 'string' && typeof to === 'string' && Number.isInteger(weight) && weight > 0) {
        return true;
    }
    return false;
}

export default abstract class Graph {
    protected vertexList: VertexNode[];
    protected hashTable: HashTable;
    protected indegreeList: number[];
    constructor(vertexNum: number, edges: Edge[]) {
        if (!edges.every(edge => checkEdge(edge))) {
            throw TypeError('Edge type error');
        }
        this.hashTable = new HashTable(vertexNum);
        this.vertexList = new Array(vertexNum);
        this.indegreeList = new Array(vertexNum).fill(0);
        this.init(edges);
    }

    protected abstract init(edges: Edge[]): void;

    protected addEdge(from: string, to: string, weight: number) {
        const {
            vertexList,
            hashTable,
            indegreeList
        } = this;
        const fromVertexIndex = hashTable.insert(from);
        const toVertexIndex = hashTable.insert(to);
        const edgeNode = {
            weight,
            next: null,
            adjVex: toVertexIndex
        };
        if (!vertexList[fromVertexIndex]) {
            vertexList[fromVertexIndex] = {
                index: fromVertexIndex,
                name: from,
                firstArc: null,
            };
        }
        if (!vertexList[toVertexIndex]) {
            vertexList[toVertexIndex] = {
                index: toVertexIndex,
                name: to,
                firstArc: null,
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