/** @format */

export default class AVLTreeNode<T> {
    public key: number
    public value: T
    public height: number
    public left: null | AVLTreeNode<T>
    public right: null | AVLTreeNode<T>
    constructor(key: number, value: T) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
        this.height = 0
    }
}
