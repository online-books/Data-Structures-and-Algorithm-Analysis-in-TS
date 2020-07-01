import BinaryTreeNode from "./binary-tree-node";

/**
 * 二叉查找树
 * 性质：对树中的每个节点X，它的左子树中所有关键字的值小于X的关键字值，右子树中所有的关键字值大于X的关键字值
 */

export default class BinarySearchTree {
  public static INORDER = Symbol("in-order");
  public static PREORDER = Symbol("pre-order");
  public static POSTORDER = Symbol("post-order");
  public static LEVELORDER = Symbol("level-order");
  public root: BinaryTreeNode | null = null;
  get height(): number {
    return this.getNodeHeight(this.root);
  }
  public find(value: number): BinaryTreeNode | null {
    let node: BinaryTreeNode | null;
    node = this.root;
    while (node) {
      if (node.val > value) {
        node = node.left;
      } else if (node.val < value) {
        node = node.right;
      } else if (node.val === value) {
        return node;
      }
    }
    return null;
  }
  public findMin(): number | null {
    const node = this.findMinNode(this.root);
    if (node) {
      return node.val;
    }
    return null;
  }
  public findMax(): number | null {
    const node = this.findMaxNode(this.root);
    if (node) {
      return node.val;
    }
    return null;
  }
  public insert(value: number): void {
    const newNode = new BinaryTreeNode(value);
    if (!this.root) {
      this.root = newNode;
    }
    let node: BinaryTreeNode | null = this.root;
    while (node) {
      if (node.val > value) {
        if (!node.left) {
          node.left = newNode;
          break;
        }
        node = node.left;
      } else if (node.val < value) {
        if (!node.right) {
          node.right = newNode;
          break;
        }
        node = node.right;
      } else if (node.val === value) {
        break;
      }
    }
  }
  public delete(value: number): void {
    this.removeNode(value, this.root);
  }
  public traverse(type: Symbol, callback?: Function) {
    if (type === BinarySearchTree.PREORDER) {
      this.preOrder(this.root, callback);
    } else if (type === BinarySearchTree.INORDER) {
      this.inOrder(this.root, callback);
    } else if (type === BinarySearchTree.POSTORDER) {
      this.postOrder(this.root, callback);
    }
  }
  private getNodeHeight(node: BinaryTreeNode | null): number {
    if (!node) {
      return -1;
    }
    return (
      1 +
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right))
    );
  }
  private inOrder(node?: BinaryTreeNode | null, callback?: Function) {
    if (!node) {
      return;
    }
    this.inOrder(node.left, callback);
    if (callback) {
      callback(node.val);
    }
    this.inOrder(node.right, callback);
  }
  private preOrder(node?: BinaryTreeNode | null, callback?: Function) {
    if (!node) {
      return;
    }
    if (callback) {
      callback(node.val);
    }
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }
  private postOrder(node?: BinaryTreeNode | null, callback?: Function) {
    if (!node) {
      return;
    }
    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    if (callback) {
      callback(node.val);
    }
  }
  private removeNode(value: number, node: BinaryTreeNode | null) {
    if (!node) {
      return node;
    }
    if (node.val === value) {
      // 节点是树叶，直接删除即可
      if (!node.left && !node.right) {
        node = null;
      }
      // 节点只包含一个子节点，返回其子节点
      else if (node.left && !node.right) {
        return node.left;
      } else if (!node.left && node.right) {
        return node.right;
      }
      // 节点有两个儿子节点，找出其右子树中最小节点X，将节点X的关键字值赋予该节点，然后删除X节点
      else {
        const minRightNode = this.findMinNode(node.right) as BinaryTreeNode;
        node.val = minRightNode.val;
        node.right = this.removeNode(minRightNode.val, node.right);
      }
    } else {
      if (node.val > value) {
        node.left = this.removeNode(value, node.left);
      } else {
        node.right = this.removeNode(value, node.right);
      }
    }
    return node;
  }
  private findMinNode(node: BinaryTreeNode | null = this.root) {
    if (!node) {
      return null;
    }
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  private findMaxNode(node: BinaryTreeNode | null = this.root) {
    if (!node) {
      return null;
    }
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}
