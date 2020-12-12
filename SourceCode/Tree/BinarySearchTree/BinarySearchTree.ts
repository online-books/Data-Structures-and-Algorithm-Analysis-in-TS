/** @format */

import BinaryTreeNode from './BinaryTreeNode'

export default class BinarySearchTree<T> {
    public size = 0
    public root: BinaryTreeNode<T> | null = null
    public min(): T | null {
        const minNode = this.findMinNode()
        if (!minNode) {
            return null
        }
        return minNode.value
    }
    public max(): T | null {
        const maxNode = this.findMaxNode()
        if (!maxNode) {
            return null
        }
        return maxNode.value
    }
    public find(key: number): T | null {
        let node: BinaryTreeNode<T> | null
        node = this.root
        while (node) {
            if (node.key > key) {
                node = node.left
            } else if (node.key < key) {
                node = node.right
            } else {
                return node.value
            }
        }
        return null
    }
    public insert(key: number, value: T): void {
        this.root = this.addChild(key, value, this.root)
    }
    public delete(key: number): void {
        this.removeChild(key, this.root)
    }
    private addChild(key: number, value: T, parentNode: BinaryTreeNode<T> | null) {
        if (!parentNode) {
            this.size += 1
            return new BinaryTreeNode(key, value)
        }
        if (key > parentNode.key) {
            parentNode.right = this.addChild(key, value, parentNode.right)
        } else if (key < parentNode.key) {
            parentNode.left = this.addChild(key, value, parentNode.left)
        } else {
            parentNode.value = value
        }
        return parentNode
    }
    private removeChild(key: number, node: BinaryTreeNode<T> | null) {
        if (!node) {
            return null
        }
        if (node.key === key) {
            // 节点有两个儿子节点，找出其右子树中最小节点X，将节点X的值赋予该节点，然后删除X节点
            if (node.left && node.right) {
                const minRightNode = this.findMinNode(node.right)!
                node.value = minRightNode.value
                node.key = minRightNode.key
                node.right = this.removeChild(minRightNode.key, node.right)
            } else {
                this.size -= 1
                // 节点是树叶，直接删除
                if (!node.left && !node.right) {
                    node = null
                }
                // 节点只包含一个子节点，返回其子节点
                else if (node.left && !node.right) {
                    node = node.left
                } else {
                    node = node.right
                }
            }
        } else {
            if (node.key > key) {
                node.left = this.removeChild(key, node.left)
            } else {
                node.right = this.removeChild(key, node.right)
            }
        }
        return node
    }
    private findMinNode(node = this.root): BinaryTreeNode<T> | null {
        while (node && node.left) {
            node = node.left
        }
        return node
    }
    private findMaxNode(node = this.root): BinaryTreeNode<T> | null {
        while (node && node.right) {
            node = node.right
        }
        return node
    }
}
