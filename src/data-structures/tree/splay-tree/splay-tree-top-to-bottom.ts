/**
 * 自顶向下伸展树
 */

import BinarySearchTree from "../binary-search-tree";
import BinaryTreeNode from "../binary-tree-node";

export default class SplayTreeTopToBottom extends BinarySearchTree {
  constructor() {
    super();
  }
  public find(val: number): BinaryTreeNode | null {
    this.root = this.rotate(val);
    if (this.root && this.root.val === val) {
      return this.root;
    }
    return null;
  }
  private rotate(val: number): BinaryTreeNode | null {
    let treeNode = this.root;
    if (!treeNode) {
      return null;
    }
    const header: BinaryTreeNode = new BinaryTreeNode(null);
    let leftTreeMax: BinaryTreeNode = header;
    let rightTreeMin: BinaryTreeNode = header;
    while (val !== treeNode.val) {
      if (treeNode.val > val) {
        if (treeNode.left && treeNode.left.val > val) {
          treeNode = this.singleRotateLeft(treeNode);
        }
        if (treeNode.left === null) {
          break;
        }
        rightTreeMin.left = treeNode;
        rightTreeMin = treeNode;
        treeNode = treeNode.left;
      } else {
        if (treeNode.right && treeNode.right.val < val) {
          treeNode = this.singleRotateRight(treeNode);
        }
        if (treeNode.right === null) {
          break;
        }
        leftTreeMax.right = treeNode;
        leftTreeMax = treeNode;
        treeNode = treeNode.right;
      }
    }
    leftTreeMax.right = treeNode.left;
    rightTreeMin.left = treeNode.right;
    treeNode.left = header.right;
    treeNode.right = header.left;
    return treeNode;
  }
  private singleRotateLeft(treeNode: BinaryTreeNode): BinaryTreeNode {
    const child = treeNode.left!;
    treeNode.left = child.right;
    child.right = treeNode;
    return child;
  }
  private singleRotateRight(treeNode: BinaryTreeNode): BinaryTreeNode {
    const child = treeNode.right!;
    treeNode.right = child.left;
    child.left = treeNode;
    return child;
  }
}
