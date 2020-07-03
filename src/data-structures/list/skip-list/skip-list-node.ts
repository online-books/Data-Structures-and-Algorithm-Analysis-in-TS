export default class SkipListNode {
  public val: number;
  public down!: SkipListNode;
  public right!: SkipListNode;
  constructor(val: number) {
    this.val = val;
  }
}
