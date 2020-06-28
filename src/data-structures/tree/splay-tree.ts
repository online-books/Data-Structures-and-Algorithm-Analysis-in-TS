import BinarySearchTree from "./binary-search-tree";
import BinaryTreeNode from "./binary-tree-node";

/**
 * 伸展树
 * 性质：从空树开始任意连续M次对树的操作最多花费O(MlogN)时间。
 * 要点：每次查找操作对应的节点X，若其有父节点P与祖父节点G，对G->P->X进行一字型或之字形旋转。
 */

export default class SplayTree extends BinarySearchTree {
  constructor() {
    super();
  }
  public find(val: number): BinaryTreeNode | null {
    this.root = this.findNode(this.root, val);
    return this.root;
  }
  private findNode(
    treeNode: BinaryTreeNode | null,
    val: number
  ): BinaryTreeNode | null {
    if (!treeNode) {
      return null;
    }
    if (treeNode.val > val) {
      const childNode = treeNode.left;
      if (!childNode) {
        return null;
      }
      if (childNode.val === val) {
        return this.zigRotateWidthLeft(treeNode);
      }
      if (childNode.val > val) {
        childNode.left = this.findNode(childNode.left, val);
        return this.zigZigRotateWithLeft(treeNode);
      }
      if (childNode.val < val) {
        childNode.right = this.findNode(childNode.right, val);
        return this.zigZagRotateWithLeft(treeNode);
      }
    } else if (treeNode.val < val) {
      const childNode = treeNode.right;
      if (!childNode) {
        return null;
      }
      if (childNode.val === val) {
        return this.zigRotateWidthRight(treeNode);
      }
      if (childNode.val > val) {
        childNode.left = this.findNode(childNode.left, val);
        return this.zigZagRotateWithRight(treeNode);
      }
      if (childNode.val < val) {
        childNode.right = this.findNode(childNode.right, val);
        return this.zigZigRotateWithRight(treeNode);
      }
    }
    return treeNode;
  }
  private zigRotateWidthLeft(node: BinaryTreeNode): BinaryTreeNode {
    const child = node.left as BinaryTreeNode;
    node.left = child.right;
    child.right = node;
    return child;
  }
  private zigRotateWidthRight(node: BinaryTreeNode): BinaryTreeNode {
    const child = node.right as BinaryTreeNode;
    node.right = child.left;
    child.left = node;
    return child;
  }
  private zigZagRotateWithLeft(node: BinaryTreeNode): BinaryTreeNode {
    const parent = node.left as BinaryTreeNode;
    const child = parent.right as BinaryTreeNode;
    parent.right = child.left;
    node.left = child.right;
    child.left = parent;
    child.right = node;
    return child;
  }
  private zigZagRotateWithRight(node: BinaryTreeNode): BinaryTreeNode {
    const parent = node.right as BinaryTreeNode;
    const child = parent.left as BinaryTreeNode;
    node.right = child.left;
    parent.left = child.right;
    child.left = node;
    child.right = parent;
    return child;
  }
  private zigZigRotateWithLeft(node: BinaryTreeNode): BinaryTreeNode {
    const parent = node.left as BinaryTreeNode;
    const child = parent.left as BinaryTreeNode;
    node.left = parent.right;
    parent.left = child.right;
    parent.right = node;
    child.right = parent;
    return child;
  }
  private zigZigRotateWithRight(node: BinaryTreeNode): BinaryTreeNode {
    const parent = node.right as BinaryTreeNode;
    const child = parent.right as BinaryTreeNode;
    node.right = parent.left;
    parent.left = node;
    parent.right = child.left;
    child.left = parent;
    return child;
  }
}
