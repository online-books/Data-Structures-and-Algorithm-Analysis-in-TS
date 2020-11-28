/** @format */

export default class LinkedListNode<T> {
    public next: LinkedListNode<T> | null = null
    public element: T
    constructor(element: T) {
        this.element = element
        this.next = null
    }
}
