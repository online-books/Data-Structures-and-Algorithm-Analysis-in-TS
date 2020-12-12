/** @format */

import BinarySearchTree from '../BinarySearchTree/BinarySearchTree'
import BinaryTreeNode from '../BinarySearchTree/BinaryTreeNode'

export default class SplayTree<T> extends BinarySearchTree<T> {
    public find(element: T): BinaryTreeNode<T> | null {
        if (!this.root) {
            return null
        }
        this.splay(element, this.root)
        return this.root
    }
    public delete(element: T): BinaryTreeNode<T> | null {
        let {root} = this
        if (!root) {
            return null
        }
        root = this.splay(element, root)
        let newRoot: BinaryTreeNode<T> | null = root
        if (element === root.element) {
            if (root.left === null) {
                newRoot = root.right
            } else {
                newRoot = root.left
                newRoot = this.splay(element, root.left)
                newRoot.right = root.right
            }
        }
        this.root = newRoot
        return newRoot
    }
    public insert(element: T): void {
        const newNode = new BinaryTreeNode(element)
        let {root} = this
        if (!root) {
            root = newNode
        } else {
            root = this.splay(element, root)
            if (element > root.element) {
                newNode.left = root.left
                newNode.right = root
                root.left = null
                root = newNode
            }
        }
        this.root = root
    }
    private splay(element: T, node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const root = new BinaryTreeNode(element)
        root.left = new BinaryTreeNode(element)
        root.right = new BinaryTreeNode(element)
        let leftTreeMax = node
        let rightTreeMin = node
        while (element !== node.element) {
            if (element < node.element) {
                const leftChild = node.left
                if (!leftChild) {
                    break
                }
                if (element < leftChild.element) {
                    node = this.singleRoteWithLeft(node)
                }
                rightTreeMin.left = node
                rightTreeMin = node
                node = leftChild
            } else {
                const rightChild = node.right
                if (!rightChild) {
                    break
                }
                if (element > rightChild.element) {
                    node = this.singleRoteWithRight(node)
                }

                leftTreeMax.right = node
                leftTreeMax = node
                node = rightChild
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
        return node
    }
    private singleRoteWithRight(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const rightChild = node.right!
        node.right = rightChild.left
        rightChild.left = node
        return node
    }
}
