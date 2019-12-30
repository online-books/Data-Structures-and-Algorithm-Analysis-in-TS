import LeftistHeapNode from './leftist-heap-node';

/**
 * 左式堆
 * 结构性：对于堆中的每一个节点X，左儿子的零路径长至少与右儿子的零路径长一样大。任一节点的
 * 零路径长比它的诸儿子的零路径长的最小值多1。
 * 零路径长Npl：从X到一个没有两个儿子的节点的最短路径长。Npl(null)==-1
 */


export default class LeftistHeap {
    private root: LeftistHeapNode | null = null;
    public getRoot(): LeftistHeapNode | null {
        return this.root;
    }
    public deleteMin(): any {
        if (this.root) {
            this.root = this.mergeNode(this.root.left, this.root.right);
        }
    }
    public insert(val: any): void {
        const node = new LeftistHeapNode(val);
        if (!this.root) {
            this.root = node;
        } else {
            this.root = this.mergeNode(node, this.root);
        }
    }
    public mergeHeap(heap: LeftistHeap): void {
        this.root = this.mergeNode(this.getRoot(), heap.getRoot());
    }
    private mergeNode(heapNode1: LeftistHeapNode | null, heapNode2: LeftistHeapNode | null): LeftistHeapNode | null {
        if (!heapNode1) {
            return heapNode2;
        }
        if (!heapNode2) {
            return heapNode1;
        }
        if (heapNode1.val < heapNode2.val) {
            return this.merge(heapNode1, heapNode2);
        } else {
            return this.merge(heapNode2, heapNode1);
        }
    }
    private merge(heapNode1: LeftistHeapNode, heapNode2: LeftistHeapNode): LeftistHeapNode {
        if (!heapNode1.left) {
            heapNode1.left = heapNode2;
        } else {
            heapNode1.right = this.mergeNode(heapNode1.right, heapNode2);
            if (heapNode1.left.npl < heapNode1.right!.npl) {
                this.swapChildNode(heapNode1);
            }
            heapNode1.npl = heapNode1.right!.npl + 1;
        }
        return heapNode1;

    }
    private swapChildNode(node: LeftistHeapNode) {
        const {
            left,
            right,
        } = node;
        node.left = right;
        node.right = left;
    }
}