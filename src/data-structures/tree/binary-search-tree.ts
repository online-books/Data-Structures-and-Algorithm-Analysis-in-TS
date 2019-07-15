import BinaryTree from './binary-tree';
import BinaryTreeNode from './binary-tree-node';

export default class BinarySearchTree extends BinaryTree {
    public static INORDER = Symbol('in-order');
    public static PREORDER = Symbol('pre-order');
    public static POSTORDER = Symbol('post-order');
    public static LEVELORDER = Symbol('level-order');
    constructor() {
        super();
    }
    get height(): number {
        return this.getNodeHeight(this.root);
    }
    public find(value: any): BinaryTreeNode | null {
        let node: BinaryTreeNode | null;
        node = this.root;
        while (node) {
            if (node.value > value) {
                node = node.left;
            } else if (node.value < value) {
                node = node.right;
            } else if (node.value === value) {
                return node;
            }
        }
        return null;
    }
    public findMin(): any {
        const node = this.findMinNode(this.root);
        if (node) {
            return node.value;
        }
        return null;
    }
    public findMax(): any {
        const node = this.findMaxNode(this.root);
        if (node) {
            return node.value;
        }
        return null;
    }
    public insert(value: any): void {
        const newNode = new BinaryTreeNode(value);
        if (!this.root) {
            this.root = newNode;
        }
        let node: BinaryTreeNode | null = this.root;
        while (node) {
            if (node.value > value) {
                if (!node.left) {
                    node.left = newNode;
                    break;
                }
                node = node.left;
            } else if (node.value < value) {
                if (!node.right) {
                    node.right = newNode;
                    break;
                }
                node = node.right;
            } else if (node.value === value) {
                break;
            }
        }
    }
    public delete(value: any): void {
        this.removeNode(value, this.root);
    }
    public traverse(type: Symbol, callback?: Function) {
        if (type === BinarySearchTree.PREORDER) {
            this.preOrder(this.root, callback);
        } else if (type === BinarySearchTree.INORDER) {
            this.inOrder(this.root, callback);
        } else if (type === BinarySearchTree.POSTORDER) {
            this.postOrder(this.root, callback);
        } else if (type === BinarySearchTree.LEVELORDER) {
            this.levelOrder(this.root)
        }
    }
    private getNodeHeight(node: BinaryTreeNode | null): number {
        if (!node) {
            return -1;
        }
        return 1 + Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right));
    }
    private inOrder(node?: BinaryTreeNode | null, callback?: Function) {
        if (!node) {
            return;
        }
        this.inOrder(node.left, callback);
        if (callback) {
            callback(node.value)
        }
        this.inOrder(node.right, callback);
    }
    private preOrder(node?: BinaryTreeNode | null, callback?: Function) {
        if (!node) {
            return;
        }
        if (callback) {
            callback(node.value);
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
            callback(node.value);
        }
    }
    private levelOrder(node?: BinaryTreeNode | null, callback?: Function) {
        return;
    }
    private removeNode(value: any, node: BinaryTreeNode | null) {
        if (!node) {
            return node;
        }
        if (node.value === value) {
            if (!node.left && !node.right) {
                node = null;
            } else if (node.left && !node.right) {
                return node.left;
            } else if (!node.left && node.right) {
                return node.right;
            } else {
                const minRightNode = this.findMinNode(node.right) as BinaryTreeNode;
                node.value = minRightNode.value;
                node.right = this.removeNode(minRightNode.value, node.right);
            }
        } else {
            if (node.value > value) {
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