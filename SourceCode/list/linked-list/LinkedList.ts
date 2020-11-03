/** @format */

import LinkedListNode from './LinkedListNode'

export interface PolynomialNodeStruct {
    coefficient: number
    exponent: number
}

export default class LinkedList<T> {
    private head: LinkedListNode<T>
    private nodeNum: number
    constructor() {
        this.head = new LinkedListNode()
        this.nodeNum = 0
    }
    public get size(): number {
        return this.nodeNum
    }
    public get firstNode(): LinkedListNode<T> | null {
        return this.head.next
    }
    public find(element: T): LinkedListNode<T> | null {
        let currentNode: LinkedListNode<T> | null = this.head.next
        while (currentNode !== null && currentNode.element !== element) {
            currentNode = currentNode.next
        }
        return currentNode
    }
    public insert(element: T, node?: LinkedListNode<T> | null): LinkedListNode<T> {
        const frontNode = node ? node : this.head
        const newNode = new LinkedListNode(element)
        const nextNode = frontNode.next
        frontNode.next = newNode
        newNode.next = nextNode
        this.nodeNum += 1
        return newNode
    }
    public delete(node: LinkedListNode<T>): void {
        const prevNode = this.findPrevNode(node)
        if (!prevNode) {
            return
        }
        prevNode.next = node.next
        node.next = null
        this.nodeNum -= 1
    }
    private findPrevNode(node: LinkedListNode<T>): LinkedListNode<T> | null {
        let currentNode = this.head
        while (currentNode.next !== null) {
            if (currentNode.next.element === node.element) {
                return currentNode
            }
            currentNode = currentNode.next
        }
        return null
    }
}
