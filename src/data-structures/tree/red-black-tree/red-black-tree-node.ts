export default class RedBlackTreeNode {
  public colorType: string;
  public left: RedBlackTreeNode;
  public right: RedBlackTreeNode;
  public static readonly RED = "red";
  public static readonly BLACK = "black";
  constructor(public val: number) {
    this.val = val;
    this.colorType = RedBlackTreeNode.BLACK;
  }
}
