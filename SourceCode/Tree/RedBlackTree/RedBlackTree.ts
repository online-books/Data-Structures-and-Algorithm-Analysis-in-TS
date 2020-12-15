/** @format */

import RedBlackTreeNode, {COLOR_TYPES} from './RedBlackTreeNode'

export default class RedBlackTree<T> {
    private root: RedBlackTreeNode<T>
    private nullNode: RedBlackTreeNode<T>
    constructor() {
        this.nullNode = new RedBlackTreeNode()
        this.nullNode.left = this.nullNode.right = this.nullNode
        this.nullNode.key = Infinity
        this.nullNode.color = COLOR_TYPES.BLACK
        this.root = new RedBlackTreeNode()
        this.root.key = -Infinity
        this.root.left = this.root.right = this.nullNode
        this.root.color = COLOR_TYPES.BLACK
    }
    public find(key: number): T | null {
        this.nullNode.key = key
        let currentNode = this.root.right
        while (key !== currentNode.key) {
            if (key < currentNode.key) {
                currentNode = currentNode.left
            } else {
                currentNode = currentNode.right
            }
        }
        if (currentNode === this.nullNode) {
            return null
        }
        return currentNode.value
    }
    public insert(key: number, value: T): void {
        let cNode = this.root.right
        let pNode = cNode
        let gpNode = pNode
        let ggpNode = gpNode
        this.nullNode.key = key
        this.nullNode.value = value
        while (key !== cNode.key) {
            ggpNode = gpNode
            gpNode = pNode
            pNode = cNode
            if (key < cNode.key) {
                cNode = cNode.left
            } else {
                cNode = cNode.right
            }
            if (cNode.left.color === COLOR_TYPES.RED && cNode.right.color === COLOR_TYPES.RED) {
                this.handleReorient(key, cNode, pNode, gpNode, ggpNode)
            }
        }
        if (cNode !== this.nullNode) {
            cNode.value = value
            return
        }
        const newNode = new RedBlackTreeNode<T>()
        newNode.color = COLOR_TYPES.RED
        newNode.key = key
        newNode.value = value
        newNode.left = this.nullNode
        newNode.right = this.nullNode
        if (key < pNode.key) {
            pNode.left = newNode
        } else {
            pNode.right = newNode
        }
        this.handleReorient(key, newNode, pNode, gpNode, ggpNode)
    }
    private handleReorient(
        key: number,
        cNode: RedBlackTreeNode<T>,
        pNode: RedBlackTreeNode<T>,
        gpNode: RedBlackTreeNode<T>,
        ggpNode: RedBlackTreeNode<T>,
    ): void {
        cNode.left.color = COLOR_TYPES.BLACK
        cNode.right.color = COLOR_TYPES.BLACK
        cNode.color = COLOR_TYPES.RED
        if (pNode.color === COLOR_TYPES.RED) {
            gpNode.color = COLOR_TYPES.RED
            if (key < gpNode.key !== key < pNode.key) {
                pNode = this.rotate(key, gpNode)
            }
            cNode = this.rotate(key, ggpNode)
            cNode.color = COLOR_TYPES.BLACK
        }
        this.root!.right.color = COLOR_TYPES.BLACK
    }
    private rotate(key: number, parentNode: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        if (key < parentNode.key) {
            if (key < parentNode.left.key) {
                parentNode.left = this.singleRotateWithLeft(parentNode.left)
            } else {
                parentNode.left = this.singleRotateWithRight(parentNode.left)
            }
            return parentNode.left
        } else {
            if (key > parentNode.right.key) {
                parentNode.right = this.singleRotateWithRight(parentNode.right)
            } else {
                parentNode.right = this.singleRotateWithLeft(parentNode.right)
            }
            return parentNode.right
        }
    }
    // 左-左单旋转
    private singleRotateWithLeft(node: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        const k1 = node.left
        node.left = k1.right
        k1.right = node
        return k1
    }
    // 右-右单旋转
    private singleRotateWithRight(node: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        const k1 = node.right
        node.right = k1.left
        k1.left = node
        return k1
    }
}
