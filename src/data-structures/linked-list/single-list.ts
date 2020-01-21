import ListNode from './list-node';

/**
 * 链表由一系列不必在内存中相连的结构组成，每一个结构均含有表元素和指向该元素后继元的结构的指针
 */
export default class SingleList {
    public size: number = 0;
    public lastNode: ListNode;
    public head: ListNode;
    constructor(value: any = null) {
        this.head = new ListNode(value);
        this.lastNode = this.head;
    }
    public insert(value: any, node?: ListNode): ListNode {
        const newNode = new ListNode(value);
        if (!node) {
            node = this.lastNode;
        }
        newNode.next = node.next;
        node.next = newNode;
        this.size += 1;
        if (this.lastNode === node) {
            this.lastNode = newNode;
        }
        return newNode;
    }
    public find(value: any): ListNode | null {
        let curNode: ListNode | null;
        curNode = this.head;
        while (curNode) {
            if (curNode.val === value) {
                return curNode;
            } else {
                curNode = curNode.next;
            }
        }
        return null;
    }
    public delete(value: any): ListNode | null {
        const prevNode = this.findPrev(value);
        if (prevNode) {
            if (prevNode.next === this.lastNode) {
                this.lastNode = prevNode;
            }
            const node = prevNode.next as ListNode;
            prevNode.next = node.next;
            this.size -= 1;
            return node;
        }
        return null;
    }
    public traverse(func?: (val: any) => void) {
        let node = this.head.next;
        while (node) {
            if (func) {
                func(node.val);
            }
            node = node.next;
        }
    }
    private findPrev(value: any): ListNode | null {
        let curNode = this.head;
        while (curNode.next) {
            if (curNode.next.val === value) {
                return curNode;
            } else {
                curNode = curNode.next;
            }
        }
        return null;
    }
}


export function buildList(nums: number[]): ListNode {
    const root: ListNode = new ListNode(0);
    let node: ListNode;
    nums.forEach(num => {
        if (!node) {
            root.val = num;
            node = root;
        } else {
            node.next = new ListNode(num);
            node = node.next;
        }
    });
    return root;
}