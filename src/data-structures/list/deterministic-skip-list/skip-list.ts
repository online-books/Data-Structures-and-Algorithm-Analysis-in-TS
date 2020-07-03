import SkipListNode from "./skip-list-node";

/**
 * 1-2-3确定性跳跃表
 * 性质：每一个间隙(除头和尾之间可能的零间隙外)的容量为1、2、3
 */
export default class SkipList {
  private head: SkipListNode;
  private tail: SkipListNode;
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
        const newNod = new SkipListNode(val);
        newNod.right = current.right;
        newNod.down = current.down.right.right;
        current.right = newNod;
        newNod.val = current.val;
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
