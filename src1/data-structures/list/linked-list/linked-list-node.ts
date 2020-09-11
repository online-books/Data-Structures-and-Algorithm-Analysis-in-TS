export default class LinkedListNode {
  public val: any;
  public next: LinkedListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}
