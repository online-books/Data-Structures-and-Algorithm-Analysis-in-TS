import AvlTreeNode from "./avl-tree-node";

/**
 * AVL树
 * 结构性：带有平衡条件的二叉查找树，其每个节点的左子树与右子树的高度最多差1。
 * 实现要点：在进行插入操作时，需要更新通向根节点路径上那些节点的平衡信息，利用【旋转】操作来保持平衡条件
 * TODO:delete
 */

export default class AVLTree {
  public root: AvlTreeNode | null;
  constructor() {
    this.root = null;
  }
  public find(val: number): AvlTreeNode | null {
    let node: AvlTreeNode | null;
    node = this.root;
    while (node) {
      if (node.val > val) {
        node = node.left;
      } else if (node.val < val) {
        node = node.right;
      } else if (node.val === val) {
        return node;
      }
    }
    return null;
  }
  public insert(value: number) {
    this.root = this.insertNode(value, this.root);
  }
  private insertNode(value: number, node: AvlTreeNode | null): AvlTreeNode {
    if (!node) {
      node = new AvlTreeNode(value);
    } else {
      if (node.val < value) {
        node.right = this.insertNode(value, node.right);
        if (this.getHeight(node.right) - this.getHeight(node.left) > 1) {
          if (value > node.right.val) {
            node = this.singleRotateWithRight(node);
          } else {
            node = this.doubleRotateWithRight(node);
          }
        }
      } else if (node.val > value) {
        node.left = this.insertNode(value, node.left);
        if (this.getHeight(node.left) - this.getHeight(node.right) > 1) {
          if (value < node.left.val) {
            node = this.singleRotateWithLeft(node);
          } else {
            node = this.doubleRotateWithLeft(node);
          }
        }
      }
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    return node;
  }
  private getHeight(node: AvlTreeNode | null): number {
    if (!node) {
      return -1;
    }
    return node.height;
  }
  // 左单旋转
  private singleRotateWithLeft(node: AvlTreeNode): AvlTreeNode {
    const k1 = node.left as AvlTreeNode;
    node.left = k1.right;
    k1.right = node;
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    k1.height = 1 + Math.max(this.getHeight(k1.left), node.height);
    return k1;
  }
  // 右单旋转
  private singleRotateWithRight(node: AvlTreeNode): AvlTreeNode {
    const k1 = node.right as AvlTreeNode;
    node.right = k1.left;
    k1.left = node;
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    k1.height = 1 + Math.max(this.getHeight(k1.right), node.height);
    return k1;
  }
  // 左双旋转
  private doubleRotateWithLeft(node: AvlTreeNode): AvlTreeNode {
    const k1 = node.left as AvlTreeNode;
    const k2 = k1.right as AvlTreeNode;
    k1.right = k2.left;
    node.left = k2.right;
    k2.left = k1;
    k2.right = node;
    node.height =
      1 + Math.max(this.getHeight(node.right), this.getHeight(node.left));
    k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right));
    k2.height = Math.max(k1.height, node.height);
    return k2;
  }
  // 右双旋转
  private doubleRotateWithRight(node: AvlTreeNode): AvlTreeNode {
    const k1 = node.right as AvlTreeNode;
    const k2 = k1.left as AvlTreeNode;
    node.right = k2.left;
    k1.left = k2.right;
    k2.left = node;
    k2.right = k1;
    node.height =
      1 + Math.max(this.getHeight(node.right), this.getHeight(node.left));
    k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right));
    k2.height = Math.max(k1.height, node.height);
    return k2;
  }
}
