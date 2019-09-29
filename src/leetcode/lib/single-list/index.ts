import ListNode from './list-node';

export default class SingleList {
    public head: ListNode;
    private lastNode: ListNode;
    constructor() {
        this.head = new ListNode('');
        this.lastNode = this.head;
    }
    public insert(value: any, node?: ListNode): void {
        const newNode = new ListNode(value);
        if (!node) {
            node = this.lastNode;
        }
        newNode.next = node.next;
        node.next = newNode;
        if (this.lastNode === node) {
            this.lastNode = newNode;
        }
    }
    public find(val: any): ListNode | null {
        let curNode = this.head.next;
        while (curNode) {
            if (curNode.val === val) {
                return curNode;
            } else {
                curNode = curNode.next;
            }
        }
        return null;
    }
}