export default class BinaryTreeNode {
    public value: any;
    public height: number;
    public left: null | BinaryTreeNode;
    public right: null | BinaryTreeNode;
    constructor(value: any) {
        this.value = value;
    }
}