/** @format */

export default class BinaryTreeNode<T> {
    public left: null | BinaryTreeNode<T>
    public right: null | BinaryTreeNode<T>
    public key: number
    public value: T
    constructor(key: number, value: T) {
        this.left = null
        this.right = null
        this.key = key
        this.value = value
    }
    public valueOf(): number {
        return this.key
    }
}
