export class SkipListNode {
  public val: any;
  public key: number;
  public forward: SkipListNode[];
  constructor(key: number, val: any) {
    this.val = val;
    this.key = key;
    this.forward = [];
  }
  get level() {
    return this.forward.length;
  }
}
