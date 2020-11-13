/** @format */

import LinkedListNode from './LinkedListNode'

interface DummyNodeStruct<T> {
    next: null | LinkedListNode<T>
}

export default class LinkedList<T> {
    private head: DummyNodeStruct<T>
    private nodeNum: number
    constructor() {
        this.head = {next: null}
        this.nodeNum = 0
    }
    public get size(): number {
        return this.nodeNum
    }
    public get firstNode(): LinkedListNode<T> | null {
        return this.head.next
    }
    public find(callback: (element: T) => boolean): LinkedListNode<T> | null {
        let currentNode = this.head.next
        while (currentNode !== null) {
            if (callback(currentNode.element)) {
                break
            }
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
    private findPrevNode(node: LinkedListNode<T>): DummyNodeStruct<T> | null {
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
