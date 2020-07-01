import RedBlackTreeNode from "./red-black-tree-node";

/**
 * 红黑树是具有下列性质的二叉查找树
 * 1.每一个节点或者是红色，或者是黑色
 * 2.根节点是黑色
 * 3.如果一个节点是红色，那么它的子节点必须是黑色
 * 4.从一个节点到一个null指针的每一条路径必须包含相同数量的黑色节点
 * TODO:delete
 */

export default class RedBlackTree {
  public root: RedBlackTreeNode;
  private currentNode: RedBlackTreeNode;
  private parentNode: RedBlackTreeNode;
  private grandNode: RedBlackTreeNode;
  private greatGrandNode: RedBlackTreeNode;
  private nullNode: RedBlackTreeNode;
  constructor() {
    this.nullNode = new RedBlackTreeNode(Number.POSITIVE_INFINITY);
    this.nullNode.left = this.nullNode;
    this.nullNode.right = this.nullNode;
    this.root = new RedBlackTreeNode(Number.NEGATIVE_INFINITY);
    this.root.left = this.nullNode;
    this.root.right = this.nullNode;
  }
  public find(value: number): RedBlackTreeNode | null {
    let node: RedBlackTreeNode = this.root.right;
    this.nullNode.val = value;
    while (node.val !== value) {
      if (node.val > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    if (node === this.nullNode) {
      return null;
    }
    return node;
  }
  public insert(val: number): RedBlackTreeNode {
    this.currentNode = this.root;
    this.parentNode = this.currentNode;
    this.grandNode = this.currentNode;
    this.greatGrandNode = this.currentNode;
    this.nullNode.val = val;
    while (this.currentNode.val !== val) {
      this.greatGrandNode = this.grandNode;
      this.grandNode = this.parentNode;
      this.parentNode = this.currentNode;
      if (this.currentNode.val > val) {
        this.currentNode = this.currentNode.left;
      } else {
        this.currentNode = this.currentNode.right;
      }
      const { left, right } = this.currentNode;
      if (
        left.colorType === RedBlackTreeNode.RED &&
        right.colorType === RedBlackTreeNode.RED
      ) {
        this.reoreint(val);
      }
    }
    if (this.currentNode !== this.nullNode) {
      throw Error("duplicate value");
    }
    const newNode = new RedBlackTreeNode(val);
    newNode.left = this.nullNode;
    newNode.right = this.nullNode;
    this.currentNode = newNode;
    if (this.parentNode.val > val) {
      this.parentNode.left = newNode;
    } else {
      this.parentNode.right = newNode;
    }
    this.reoreint(val);
    return newNode;
  }
  public delete(val: number): void {}
  private reoreint(val: number): void {
    const currentNode = this.currentNode!;
    currentNode.colorType = RedBlackTreeNode.RED;
    const { left, right } = currentNode;

    if (left && right) {
      left.colorType = RedBlackTreeNode.BLACK;
      right.colorType = RedBlackTreeNode.BLACK;
    }
    if (this.parentNode.colorType === RedBlackTreeNode.RED) {
      this.grandNode.colorType = RedBlackTreeNode.RED;
      if (this.parentNode.val > val !== this.grandNode.val > val) {
        this.parentNode = this.rotate(this.grandNode, val);
      }
      this.currentNode = this.rotate(this.greatGrandNode, val);
      this.currentNode.colorType = RedBlackTreeNode.BLACK;
    }
    this.root.right.colorType = RedBlackTreeNode.BLACK;
  }

  private rotate(treeNode: RedBlackTreeNode, val: number): RedBlackTreeNode {
    if (treeNode.val > val) {
      const leftChild = treeNode.left!;
      if (!leftChild) {
        console.log(this);
      }
      if (leftChild.val > val) {
        treeNode.left = this.singleRotateWithLeft(leftChild);
      } else {
        treeNode.left = this.singleRotateWithRight(leftChild);
      }
      return treeNode.left;
    } else {
      const rightChild = treeNode.right!;
      if (rightChild.val > val) {
        treeNode.right = this.singleRotateWithLeft(rightChild);
      } else {
        treeNode.right = this.singleRotateWithRight(rightChild);
      }
      return treeNode.right;
    }
  }
  private singleRotateWithLeft(treeNode: RedBlackTreeNode): RedBlackTreeNode {
    const childNode = treeNode.left!;
    treeNode.left = childNode.right;
    childNode.right = treeNode;
    return childNode;
  }
  private singleRotateWithRight(treeNode: RedBlackTreeNode) {
    const childNode = treeNode.right!;
    treeNode.right = childNode.left;
    childNode.left = treeNode;
    return childNode;
  }
}
