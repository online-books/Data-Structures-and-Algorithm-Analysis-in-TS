/** @format */

import LeftistHeapNode from './LeftistHeapNode'

function swapChildNode(treeNode: {left: any; right: any}) {
    const {left, right} = treeNode
    treeNode.left = right
    treeNode.right = left
}

export default class LeftistHeap<T> {
    public root: LeftistHeapNode<T> | null = null
    public size = 0
    public deleteMin(): void {
        if (this.root) {
            this.root = this.mergeToRightChild(this.root.left, this.root.right)
            this.size -= 1
        }
    }
    public insert(element: T): void {
        const node = new LeftistHeapNode(element)
        if (!this.root) {
            this.root = node
        } else {
            this.root = this.mergeToRightChild(this.root, node)
        }
        this.size += 1
    }
    public getMin(): T | null {
        if (!this.root) {
            return null
        }
        return this.root.element
    }
    public merge(heap: LeftistHeap<T>): void {
        this.root = this.mergeToRightChild(this.root, heap.root)
        this.size += heap.size
    }
    private mergeToRightChild(
        heapNode1: LeftistHeapNode<T> | null,
        heapNode2: LeftistHeapNode<T> | null,
    ): LeftistHeapNode<T> | null {
        if (!heapNode1) {
            return heapNode2
        }
        if (!heapNode2) {
            return heapNode1
        }
        if (heapNode1.element < heapNode2.element) {
            return this.mergeHeapNode(heapNode1, heapNode2)
        } else {
            return this.mergeHeapNode(heapNode2, heapNode1)
        }
    }
    private mergeHeapNode(heapNode1: LeftistHeapNode<T>, heapNode2: LeftistHeapNode<T>): LeftistHeapNode<T> {
        if (!heapNode1.left) {
            heapNode1.left = heapNode2
        } else {
            heapNode1.right = this.mergeToRightChild(heapNode1.right, heapNode2)
            if (heapNode1.left.npl < heapNode1.right!.npl) {
                swapChildNode(heapNode1)
            }
            heapNode1.npl = heapNode1.right!.npl + 1
        }
        return heapNode1
    }
}
