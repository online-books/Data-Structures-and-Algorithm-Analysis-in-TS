export default class TreeNode {
    public left: TreeNode | null;
    public right: TreeNode | null;
    constructor(public val: any) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}