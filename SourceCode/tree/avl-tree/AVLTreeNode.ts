export default class AVLTreeNode<T> {
    public element: T;
    public height: number;
    public left: null | AVLTreeNode<T>;
    public right: null | AVLTreeNode<T>;
    constructor(element: T) {
        this.element = element;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}