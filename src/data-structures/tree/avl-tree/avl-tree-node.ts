export default class AvlTreeNode {
    public val: number;
    public height: number;
    public left: null | AvlTreeNode;
    public right: null | AvlTreeNode;
    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}