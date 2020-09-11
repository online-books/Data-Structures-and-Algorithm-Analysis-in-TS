import LinkedListNode from "./linked-list-node";

/**
 * 链表由一系列不必在内存中相连的结构组成，每一个结构均含有表元素和指向该元素后继元的结构的指针
 */
export default class LinkedList {
  public size: number = 0;
  public lastNode: LinkedListNode;
  private head: LinkedListNode;
  constructor() {
    this.head = new LinkedListNode(Number.NEGATIVE_INFINITY);
    this.lastNode = this.head;
  }
  public get firstNode() {
    return this.head.next;
  }
  public insert(value: number, target?: LinkedListNode): LinkedListNode {
    const newNode = new LinkedListNode(value);
    let node = target;
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
  public find(value: number): LinkedListNode | null {
    let curNode: LinkedListNode | null;
    curNode = this.head;
    while (curNode && curNode.val !== value) {
      curNode = curNode.next;
    }
    return curNode;
  }
  public delete(value: number): LinkedListNode | null {
    const prevNode = this.findPrev(value);
    if (prevNode && prevNode.next) {
      const node = prevNode.next;
      prevNode.next = node.next;
      this.size -= 1;
      if (node === this.lastNode) {
        this.lastNode = prevNode;
      }
      return node;
    }
    return null;
  }
  private findPrev(value: number): LinkedListNode | null {
    let curNode = this.head;
    while (curNode.next && curNode.next.val !== value) {
      curNode = curNode.next;
    }
    return curNode;
  }
}
