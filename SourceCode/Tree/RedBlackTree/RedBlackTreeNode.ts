/** @format */

export const enum COLOR_TYPES {
    RED,
    BLACK,
}

export default class RedBlackTreeNode<T> {
    public key: number
    public value: T
    public left: RedBlackTreeNode<T>
    public right: RedBlackTreeNode<T>
    public color: COLOR_TYPES
}
