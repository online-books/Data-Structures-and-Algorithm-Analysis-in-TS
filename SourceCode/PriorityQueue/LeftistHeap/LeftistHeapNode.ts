/** @format */

export default class LeftistHeapNode<T> {
    public left: LeftistHeapNode<T> | null = null
    public right: LeftistHeapNode<T> | null = null
    public npl = 0
    constructor(public element: T) {
        this.element = element
    }
}
