/** @format */

export default class SkewHeapNode<T> {
    public element: T
    public left: SkewHeapNode<T> | null = null
    public right: SkewHeapNode<T> | null = null
    constructor(element: T) {
        this.element = element
    }
}
