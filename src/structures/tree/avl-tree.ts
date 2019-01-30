/**
 * AVL树
 */


import BinarySearchTree from './binary-search-tree';
import BinaryTreeNode from './binary-tree-node';

export default class AVLTree extends BinarySearchTree {
    constructor() {
        super();
    }
    get height (): number {
        return this.getHeight(this.root);
    }
    public insert (value: any) {
        this.root = this.insertNode(value, this.root);
    }
    private insertNode (value: any, node: BinaryTreeNode | null): BinaryTreeNode {
        if (!node) {
            node = new BinaryTreeNode(value);
        } else {
            if (node.value < value) {
                node.right = this.insertNode(value, node.right);
                if (this.getHeight(node.right) - this.getHeight(node.left) > 1) {
                    if (value > node.right.value) {
                        node = this.singleRotateWithRight(node);
                    } else {
                        node = this.doubleRotateWithRight(node);
                    }
                }
            } else if (node.value > value) {
                node.left = this.insertNode(value, node.left);
                if (this.getHeight(node.left) - this.getHeight(node.right) > 1) {
                    if (value < node.left.value) {
                        node = this.singleRotateWithLeft(node);
                    } else {
                        node = this.doubleRotateWithLeft(node);
                    }
                }
            }
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        return node;
    }
    private getHeight (node: BinaryTreeNode | null): number {
        if (!node) {
            return -1;
        }
        return node.height;
    }
    private singleRotateWithLeft (node: BinaryTreeNode): BinaryTreeNode {
        const k1 = node.left as BinaryTreeNode;
        node.left = k1.right;
        k1.right = node;
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        k1.height = 1 + Math.max(this.getHeight(k1.left), node.height);
        return k1;
    }
    private singleRotateWithRight (node: BinaryTreeNode): BinaryTreeNode {
        const k1 = node.right as BinaryTreeNode;
        node.right = k1.left;
        k1.left = node;
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        k1.height = 1 + Math.max(this.getHeight(k1.right), node.height);
        return k1;
    }
    private doubleRotateWithLeft (node: BinaryTreeNode): BinaryTreeNode {
        const k1 = node.left as BinaryTreeNode;
        const k2 = k1.right as BinaryTreeNode;
        k1.right = k2.left;
        node.left = k2.right;
        k2.left = k1;
        k2.right = node;
        node.height = 1 + Math.max(this.getHeight(node.right), this.getHeight(node.left));
        k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right));
        k2.height = Math.max(k1.height, node.height);
        return k2;
    }
    private doubleRotateWithRight (node: BinaryTreeNode): BinaryTreeNode {
        const k1 = node.right as BinaryTreeNode;
        const k2 = k1.left as BinaryTreeNode;
        node.right = k2.left;
        k1.left = k2.right;
        k2.left = node;
        k2.right = k1;
        node.height = 1 + Math.max(this.getHeight(node.right), this.getHeight(node.left));
        k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right));
        k2.height = Math.max(k1.height, node.height);
        return k2;
    }
}