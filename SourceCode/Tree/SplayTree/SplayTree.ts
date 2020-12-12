/** @format */

import BinarySearchTree from '../BinarySearchTree/BinarySearchTree'
import BinaryTreeNode from '../BinarySearchTree/BinaryTreeNode'

export default class SplayTree<T> extends BinarySearchTree<T> {
    public find(key: number): T | null {
        if (!this.root) {
            return null
        }
        this.root = this.splay(key, this.root)
        return this.root.value
    }
    public delete(key: number): void {
        let {root} = this
        if (!root) {
            return
        }
        root = this.splay(key, root)
        let newRoot: BinaryTreeNode<T> | null = root
        if (key === root.key) {
            this.size -= 1
            if (root.left === null) {
                newRoot = root.right
            } else {
                newRoot = root.left
                newRoot = this.splay(key, newRoot)
                newRoot.right = root.right
            }
        }
        this.root = newRoot
    }
    public insert(key: number, value: T): void {
        const newNode = new BinaryTreeNode(key, value)
        let {root} = this
        if (!root) {
            this.size += 1
            root = newNode
        } else {
            root = this.splay(key, root)
            if (key !== root.key) {
                this.size += 1
                if (key > root.key) {
                    newNode.left = root
                    newNode.right = root.right
                    root.right = null
                    root = newNode
                } else {
                    newNode.right = root
                    newNode.left = root.left
                    root.left = null
                    root = newNode
                }
            }
        }
        this.root = root
    }
    private splay(key: number, node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const root = new BinaryTreeNode(key, node.value)
        let leftTreeMax = root
        let rightTreeMin = root
        while (key !== node.key) {
            if (key < node.key) {
                if (!node.left) {
                    break
                }
                if (key < node.left.key) {
                    node = this.singleRoteWithLeft(node)
                }
                if (!node.left) {
                    break
                }
                rightTreeMin.left = node
                rightTreeMin = node
                node = node.left
            } else {
                if (!node.right) {
                    break
                }
                if (key > node.right.key) {
                    node = this.singleRoteWithRight(node)
                }
                if (!node.right) {
                    break
                }
                leftTreeMax.right = node
                leftTreeMax = node
                node = node.right
            }
        }
        leftTreeMax.right = node.left!
        rightTreeMin.left = node.right!
        node.right = root.left
        node.left = root.right
        return node
    }
    private singleRoteWithLeft(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const leftChild = node.left!
        node.left = leftChild.right
        leftChild.right = node
        return leftChild
    }
    private singleRoteWithRight(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const rightChild = node.right!
        node.right = rightChild.left
        rightChild.left = node
        return rightChild
    }
}
