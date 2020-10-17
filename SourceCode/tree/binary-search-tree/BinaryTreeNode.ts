export default class BinaryTreeNode<T>{
    public left: null | BinaryTreeNode<T>;
    public right: null | BinaryTreeNode<T>;
    public element: T;
    constructor(element: T) {
        this.left = null;
        this.right = null;
        this.element = element;
    }
}