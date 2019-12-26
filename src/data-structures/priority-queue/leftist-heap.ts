import LeftistHeapNode from './leftist-heap-node';

/**
 * 左式堆
 * 性质：对于堆中的每一个节点X，左儿子的零路径长至少与右儿子的零路径长一样大。任一节点的
 * 零路径长比它的诸儿子的零路径长的最小值多1。
 * 零路径长Npl：从X到一个没有两个儿子的节点的最短路径长。Npl(null)==-1
 */


export default class LeftistHeap {
    private root: LeftistHeapNode;
    constructor() {
        this.root = new LeftistHeapNode(null);
    }
    static create(val: any[]): LeftistHeap {

    }
    public deleteMin(): void {

    }
    public insert(val: any): void {

    }
    public merge(leftistHeap: LeftistHeap): void {

    }
    private mergeRight(heap1: LeftistHeap, heap2: LeftistHeap): LeftistHeap {

    }
}