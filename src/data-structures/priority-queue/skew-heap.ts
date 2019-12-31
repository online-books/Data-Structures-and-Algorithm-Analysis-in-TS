/**
 * 斜堆
 * 左式堆的自调节形式，斜堆与左式堆的关系类似于伸展数与AVL树间的关系。
 * 斜堆是具有堆序的二叉树，但不存在对树结构的限制。
 */

import BinaryTreeNode from '../tree/binary-tree-node';
import { swapChildNode } from '@src/share/utils';

export default class SkewHeap {
    public root: BinaryTreeNode | null = null;
    public merge(skewHeap: SkewHeap): void {
        this.root = this.preMerge(this.root, skewHeap.root);
    }
    public insert(val: any) {
        const node = new BinaryTreeNode(val);
        this.root = this.preMerge(this.root, node);
    }
    public deleteMin() {
        if (this.root) {
            const {
                left,
                right
            } = this.root;
            this.root = this.preMerge(left, right);
        }

    }
    private preMerge(node1: BinaryTreeNode | null, node2: BinaryTreeNode | null): BinaryTreeNode | null {
        if (!node1) {
            return node2;
        }
        if (!node2) {
            return node1;
        }
        if (node1.val < node2.val) {
            return this.mergeNode(node1, node2);
        } else {
            return this.mergeNode(node2, node1);
        }
    }
    private mergeNode(node1: BinaryTreeNode, node2: BinaryTreeNode): BinaryTreeNode {
        node1.right = this.preMerge(node1.right, node2);
        swapChildNode(node1);
        return node1;
    }
}