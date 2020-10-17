import BinaryTreeNode from './BinaryTreeNode'

export default class BinarySearchTree<T>{
    public root: BinaryTreeNode<T> | null = null;

    public find(element: T) {
        let node: BinaryTreeNode<T> | null;
        node = this.root;
        while (node) {
            if (node.element > element) {
                node = node.left;
            } else if (node.element < element) {
                node = node.right;
            } else {
                return node;
            }
        }
        return null;
    }
    public findMin(node = this.root): BinaryTreeNode<T> | null {
        while (node && node.left) {
            node = node.left;
        }
        return node;
    }
    public findMax(node = this.root): BinaryTreeNode<T> | null {
        while (node && node.right) {
            node = node.right;
        }
        return node;
    }
    public insert(element: T) {
        this.root = this.addChild(element, this.root);
    }
    public delete(element: T): BinaryTreeNode<T> | null {
        return this.removeChild(element, this.root);
    }
    private addChild(element: T, parentNode: BinaryTreeNode<T> | null) {
        if (!parentNode) {
            return new BinaryTreeNode(element);
        }
        if (element > parentNode.element) {
            parentNode.right = this.addChild(element, parentNode.right)
        } else if (element < parentNode.element) {
            parentNode.left = this.addChild(element, parentNode.left)
        } else {
            parentNode.element = element
        }
        return parentNode;
    }
    private removeChild(element: T, node: BinaryTreeNode<T> | null) {
        if (!node) {
            return null;
        }
        if (node.element === element) {
            const { left: leftChild, right: rightChild } = node;
            // 节点是树叶，直接删除
            if (!leftChild && !rightChild) {
                node = null;
            }
            // 节点只包含一个子节点，返回其子节点
            else if (leftChild && !rightChild) {
                node.left = null;
                return leftChild;
            } else if (!leftChild && rightChild) {
                node.right = null;
                return rightChild;
            }
            // 节点有两个儿子节点，找出其右子树中最小节点X，将节点X的关键字值赋予该节点，然后删除X节点
            else {
                const minRightNode = this.findMin(node.right)!;
                node.element = minRightNode.element;
                node.right = this.removeChild(minRightNode.element, node.right);
            }
        } else {
            if (node.element > element) {
                node.left = this.removeChild(element, node.left);
            } else {
                node.right = this.removeChild(element, node.right);
            }
        }
        return node;
    }
}