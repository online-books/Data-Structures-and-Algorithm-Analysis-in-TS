import Node from './node';

export default class List {
    public size: number = 0;
    private head: Node;
    private lastNode: Node;
    constructor(value: any = null) {
        this.head = new Node(value);
        this.lastNode = this.head;
    }
    public last () {
        return this.lastNode;
    }
    public first () {
        return this.head.next;
    }
    public insert (value: any, node?: Node): Node {
        const newNode = new Node(value);
        if (!node) {
            node = this.last();
        }
        newNode.next = node.next;
        node.next = newNode;
        this.size += 1;
        if (this.lastNode === node) {
            this.lastNode = newNode;
        }
        return newNode;
    }
    public find (value: any): Node | null {
        let curNode: Node | null;
        curNode = this.head;
        while (curNode) {
            if (curNode.value === value) {
                return curNode;
            } else {
                curNode = curNode.next;
            }
        }
        return null;
    }
    public delete (value: any): Node | null {
        const prevNode = this.findPrev(value);
        if (prevNode) {
            if (prevNode.next === this.lastNode) {
                this.lastNode = prevNode;
            }
            const node = prevNode.next as Node;
            prevNode.next = node.next;
            this.size -= 1;
            return node;
        }
        return null;
    }
    public traverse (func: Function) {
        let node = this.head.next;
        while (node) {
            func(node.value);
            node = node.next;
        }
    }
    private findPrev (value: any): Node | null {
        let curNode = this.head;
        while (curNode.next) {
            if (curNode.next.value === value) {
                return curNode;
            } else {
                curNode = curNode.next;
            }
        }
        return null;
    }
}