/**
 * 二叉树
 * 结构性：每个节点都不能有多余两个的儿子节点
 */
export default class TreeNode {
    public left: TreeNode | null;
    public right: TreeNode | null;
    constructor(public val: any) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}