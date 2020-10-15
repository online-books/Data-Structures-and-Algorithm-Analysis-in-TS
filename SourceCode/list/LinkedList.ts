import LinkedListNode from './LinkedListNode';

export default class LinkedList<T> {
    private head: LinkedListNode<T>;
    constructor() {
        this.head = new LinkedListNode()
    }
    public get isEmpty(): boolean {
        return this.head.next === null
    }
    public find(value: T): LinkedListNode<T> | null {
        let currentNode: LinkedListNode<T> | null = this.head.next;
        while (currentNode !== null && currentNode.value !== value) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    public insert(value: T, node?: LinkedListNode<T>): LinkedListNode<T> {
        const newNode = new LinkedListNode(value);
        const prevNode = this.findPrevNode(node);
        const nextNode = prevNode.next;
        prevNode.next = newNode;
        newNode.next = nextNode;
        return newNode;
    }
    public delete(node: LinkedListNode<T>) {
        const prevNode = this.findPrevNode(node);
        prevNode.next = node.next;
        node.next = null;
    }
    private findPrevNode(node?: LinkedListNode<T>): LinkedListNode<T> {
        if (!node) {
            return this.head;
        }
        let currentNode = this.head;
        while (currentNode.next !== null && currentNode.next.value !== node.value) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}