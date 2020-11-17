/** @format */

import LinkedListNode from './LinkedListNode'

interface DummyNodeStruct<T> {
    next: null | LinkedListNode<T>
}

export default class LinkedList<T> {
    private head: DummyNodeStruct<T>
    private nodeCount: number
    constructor() {
        this.head = {next: null}
        this.nodeCount = 0
    }
    public get size(): number {
        return this.nodeCount
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
        this.nodeCount += 1
        return newNode
    }
    public delete(callback: (element: T) => boolean): void {
        let currentNode = this.head
        while (currentNode.next !== null) {
            if (callback(currentNode.next.element)) {
                currentNode.next = currentNode.next.next
                break
            }
            currentNode = currentNode.next
        }
        this.nodeCount -= 1
    }
    public traverse(callback: (element: T) => void): void {
        const dfs = (node: LinkedListNode<T> | null) => {
            if (node) {
                dfs(node.next)
                callback(node.element)
            }
        }
        dfs(this.head.next)
    }
}
