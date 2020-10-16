
export default class LinkedListNode<T> {
    public next: LinkedListNode<T> | null = null;
    public value: T | null = null;
    constructor(value?: T) {
        if (value) {
            this.value = value;
        }
    }
}