export default class AvlTreeNode {
    public val: any;
    public height: number;
    public left: null | AvlTreeNode;
    public right: null | AvlTreeNode;
    constructor(val: any) {
        this.val = val;
    }
}