/** @format */

import AVLTreeNode from './AVLTreeNode'

export default class AVLTree<T> {
    public root: AVLTreeNode<T> | null = null
    public find(key: number): T | null {
        let node: AVLTreeNode<T> | null
        node = this.root
        while (node) {
            if (node.key > key) {
                node = node.left
            } else if (node.key < key) {
                node = node.right
            } else if (node.key === key) {
                return node.value
            }
        }
        return null
    }
    public insert(key: number, value: T): void {
        this.root = this.addChild(key, value, this.root)
    }
    private addChild(key: number, value: T, node: AVLTreeNode<T> | null): AVLTreeNode<T> {
        if (!node) {
            node = new AVLTreeNode(key, value)
        } else {
            if (node.key < key) {
                node.right = this.addChild(key, value, node.right)
                if (this.getHeight(node.right) - this.getHeight(node.left) > 1) {
                    if (key > node.right.key) {
                        // 情形d
                        node = this.singleRotateWithRight(node)
                    } else {
                        // 情形c
                        node = this.doubleRotateWithRight(node)
                    }
                }
            } else if (node.key > key) {
                node.left = this.addChild(key, value, node.left)
                if (this.getHeight(node.left) - this.getHeight(node.right) > 1) {
                    if (key < node.left.key) {
                        // 情形a
                        node = this.singleRotateWithLeft(node)
                    } else {
                        // 情形b
                        node = this.doubleRotateWithLeft(node)
                    }
                }
            }
        }
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
        return node
    }
    private getHeight(node: AVLTreeNode<T> | null): number {
        if (!node) {
            return -1
        }
        return node.height
    }
    // 左-左单旋转
    private singleRotateWithLeft(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const k1 = node.left!
        node.left = k1.right
        k1.right = node
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
        k1.height = 1 + Math.max(this.getHeight(k1.left), node.height)
        return k1
    }
    // 右-右单旋转
    private singleRotateWithRight(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const k1 = node.right!
        node.right = k1.left
        k1.left = node
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
        k1.height = 1 + Math.max(this.getHeight(k1.right), node.height)
        return k1
    }
    // 左-右双旋转
    private doubleRotateWithLeft(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const k1 = node.left!
        const k2 = k1.right!
        k1.right = k2.left
        node.left = k2.right
        k2.left = k1
        k2.right = node
        node.height = 1 + Math.max(this.getHeight(node.right), this.getHeight(node.left))
        k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right))
        k2.height = Math.max(k1.height, node.height)
        return k2
    }
    // 右-左双旋转
    private doubleRotateWithRight(node: AVLTreeNode<T>): AVLTreeNode<T> {
        const k1 = node.right!
        const k2 = k1.left!
        node.right = k2.left
        k1.left = k2.right
        k2.left = node
        k2.right = k1
        node.height = 1 + Math.max(this.getHeight(node.right), this.getHeight(node.left))
        k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right))
        k2.height = Math.max(k1.height, node.height)
        return k2
    }
}
