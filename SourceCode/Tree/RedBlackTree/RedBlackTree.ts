/** @format */

import RedBlackTreeNode, {COLOR_TYPES} from './RedBlackTreeNode'

/**
 * 红黑树是具有下列性质的二叉查找树
 * 1.每一个节点或者是红色，或者是黑色
 * 2.根节点是黑色
 * 3.如果一个节点是红色，那么它的子节点必须是黑色
 * 4.从一个节点到一个null指针的每一条路径必须包含相同数量的黑色节点
 *
 * TODO:delete
 */

export default class RedBlackTree<T> {
    public root: RedBlackTreeNode<T>
    private currentNode: RedBlackTreeNode<T>
    private siblingNode: RedBlackTreeNode<T>
    private parentNode: RedBlackTreeNode<T>
    private grandNode: RedBlackTreeNode<T>
    private greatGrandNode: RedBlackTreeNode<T>
    private nullNode: RedBlackTreeNode<T>
    constructor() {
        this.nullNode = new RedBlackTreeNode()
        this.nullNode.key = Number.POSITIVE_INFINITY
        this.nullNode.color = COLOR_TYPES.BLACK
        this.nullNode.left = this.nullNode
        this.nullNode.right = this.nullNode
        this.root = new RedBlackTreeNode()
        this.root.key = Number.NEGATIVE_INFINITY
        this.root.color = COLOR_TYPES.BLACK
        this.root.left = this.nullNode
        this.root.right = this.nullNode
    }
    public find(key: number): T | null {
        let node: RedBlackTreeNode<T> = this.root.right
        this.nullNode.key = key
        while (node.key !== key) {
            if (node.key > key) {
                node = node.left
            } else {
                node = node.right
            }
        }
        if (node === this.nullNode) {
            return null
        }
        return node.value
    }
    public delete(key: number): void {
        this.removeChild(key, this.root)
    }
    public insert(key: number, value: T): void {
        this.currentNode = this.root
        this.parentNode = this.currentNode
        this.grandNode = this.currentNode
        this.greatGrandNode = this.currentNode
        this.nullNode.key = key
        while (this.currentNode.key !== key) {
            this.greatGrandNode = this.grandNode
            this.grandNode = this.parentNode
            this.parentNode = this.currentNode
            if (this.currentNode.key > key) {
                this.currentNode = this.currentNode.left
            } else {
                this.currentNode = this.currentNode.right
            }
            const {left, right} = this.currentNode
            if (left.color === COLOR_TYPES.RED && right.color === COLOR_TYPES.RED) {
                this.reoreint(key)
            }
        }
        if (this.currentNode !== this.nullNode) {
            this.currentNode.value = value
            return
        }
        const newNode = new RedBlackTreeNode<T>()
        newNode.left = this.nullNode
        newNode.right = this.nullNode
        newNode.key = key
        newNode.value = value
        this.currentNode = newNode
        if (this.parentNode.key > key) {
            this.parentNode.left = newNode
        } else {
            this.parentNode.right = newNode
        }
        this.reoreint(key)
    }
    private reoreint(key: number): void {
        const currentNode = this.currentNode
        currentNode.color = COLOR_TYPES.RED
        const {left, right} = currentNode
        left.color = COLOR_TYPES.BLACK
        right.color = COLOR_TYPES.BLACK
        if (this.parentNode.color === COLOR_TYPES.RED) {
            this.grandNode.color = COLOR_TYPES.RED
            if (this.parentNode.key > key !== this.grandNode.key > key) {
                this.parentNode = this.rotate(this.grandNode, key)
            }
            this.currentNode = this.rotate(this.greatGrandNode, key)
            this.currentNode.color = COLOR_TYPES.BLACK
        }
        this.root.right.color = COLOR_TYPES.BLACK
        this.siblingNode
    }
    private removeChild(key: number, node: RedBlackTreeNode<T>) {
        this.currentNode = node
        this.siblingNode = node
        this.currentNode = node
        this.nullNode.key = key
        while (key !== this.currentNode.key) {}
        if (this.currentNode === this.nullNode) {
            return
        }
        if (this.currentNode.left && this.currentNode.right) {
        }
    }

    private rotate(treeNode: RedBlackTreeNode<T>, key: number): RedBlackTreeNode<T> {
        if (treeNode.key > key) {
            const leftChild = treeNode.left!
            if (leftChild.key > key) {
                treeNode.left = this.singleRotateWithLeft(leftChild)
            } else {
                treeNode.left = this.singleRotateWithRight(leftChild)
            }
            return treeNode.left
        } else {
            const rightChild = treeNode.right!
            if (rightChild.key > key) {
                treeNode.right = this.singleRotateWithLeft(rightChild)
            } else {
                treeNode.right = this.singleRotateWithRight(rightChild)
            }
            return treeNode.right
        }
    }
    private singleRotateWithLeft(treeNode: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        const childNode = treeNode.left!
        treeNode.left = childNode.right
        childNode.right = treeNode
        return childNode
    }
    private singleRotateWithRight(treeNode: RedBlackTreeNode<T>) {
        const childNode = treeNode.right!
        treeNode.right = childNode.left
        childNode.left = treeNode
        return childNode
    }
}
