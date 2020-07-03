import SkipListNode from "./skip-list-node";

/**
 * 1-2-3确定性跳跃表
 * 性质：每一个间隙(除头和尾之间可能的零间隙外)的容量为1、2、3
 * TODO:delete
 */
export default class SkipList {
  public head: SkipListNode;
  public tail: SkipListNode;
  private bottom: SkipListNode;
  constructor() {
    const head = new SkipListNode(Number.POSITIVE_INFINITY);
    const tail = new SkipListNode(Number.POSITIVE_INFINITY);
    const bottom = new SkipListNode(Number.POSITIVE_INFINITY);
    bottom.right = bottom;
    bottom.down = bottom;
    head.right = tail;
    head.down = bottom;
    tail.right = tail;
    tail.down = bottom;
    this.head = head;
    this.tail = tail;
    this.bottom = bottom;
  }
  public get height() {
    let height = 0;
    let current = this.head;
    while (current !== this.bottom) {
      height += 1;
      current = current.down;
    }
    return height;
  }

  public insert(val: number) {
    this.bottom.val = val;
    let current = this.head;
    while (current !== this.bottom) {
      while (val > current.val) {
        current = current.right;
      }
      if (current.val > current.down.right.right.val) {
        const newNode = new SkipListNode(val);
        newNode.right = current.right;
        newNode.down = current.down.right.right;
        current.right = newNode;
        newNode.val = current.val;
        current.val = current.down.right.val;
      } else {
        current = current.down;
      }
    }
    if (this.head.right !== this.tail) {
      const newNode = new SkipListNode(Number.POSITIVE_INFINITY);
      newNode.down = this.head;
      newNode.right = this.tail;
      this.head = newNode;
    }
  }
  public find(val: number): SkipListNode | null {
    this.bottom.val = val;
    let current = this.head;
    while (current.val !== val) {
      if (current.val > val) {
        current = current.down;
      } else {
        current = current.right;
      }
    }
    if (current === this.bottom) {
      return null;
    }
    return current;
  }
}
