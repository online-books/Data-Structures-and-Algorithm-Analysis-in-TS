
export default class LinkedListNode<T> {
    public next: LinkedListNode<T> | null = null;
    public element: T | null = null;
    constructor(element?: T) {
        if (element) {
            this.element = element;
        }
    }
}