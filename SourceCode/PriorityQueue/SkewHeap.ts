/** @format */

import BinaryTreeNode from '../Tree/BinarySearchTree/BinaryTreeNode'

function swapChildNode(treeNode: {left: any; right: any}) {
    const {left, right} = treeNode
    treeNode.left = right
    treeNode.right = left
}

export default class SkewHeap<T> {
    public root: BinaryTreeNode<T> | null = null
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
        const node = new BinaryTreeNode<T>(element)
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
    private mergeToRightChild(
        node1: BinaryTreeNode<T> | null,
        node2: BinaryTreeNode<T> | null,
    ): BinaryTreeNode<T> | null {
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
    private mergeNode(node1: BinaryTreeNode<T>, node2: BinaryTreeNode<T>): BinaryTreeNode<T> {
        node1.right = this.mergeToRightChild(node1.right, node2)
        swapChildNode(node1)
        return node1
    }
}
