/** @format */

import SkewHeapNode from './SkewHeapNode'

function swapChildNode(treeNode: {left: any; right: any}) {
    const {left, right} = treeNode
    treeNode.left = right
    treeNode.right = left
}

export default class SkewHeap<T> {
    public root: SkewHeapNode<T> | null = null
    public size = 0
    public merge(skewHeap: SkewHeap<T>): void {
        this.root = this.mergeToRightChild(this.root, skewHeap.root)
        this.size += skewHeap.size
    }
    public getMin(): T | null {
        if (!this.root) {
            return null
        }
        return this.root.element
    }
    public insert(element: T): void {
        const node = new SkewHeapNode<T>(element)
        this.root = this.mergeToRightChild(this.root, node)
        this.size += 1
    }
    public deleteMin(): void {
        if (this.root) {
            const {left, right} = this.root
            this.root = this.mergeToRightChild(left, right)
            this.size -= 1
        }
    }
    private mergeToRightChild(node1: SkewHeapNode<T> | null, node2: SkewHeapNode<T> | null): SkewHeapNode<T> | null {
        if (!node1) {
            return node2
        }
        if (!node2) {
            return node1
        }
        if (node1.element < node2.element) {
            return this.mergeNode(node1, node2)
        } else {
            return this.mergeNode(node2, node1)
        }
    }
    private mergeNode(node1: SkewHeapNode<T>, node2: SkewHeapNode<T>): SkewHeapNode<T> {
        node1.right = this.mergeToRightChild(node1.right, node2)
        swapChildNode(node1)
        return node1
    }
}
