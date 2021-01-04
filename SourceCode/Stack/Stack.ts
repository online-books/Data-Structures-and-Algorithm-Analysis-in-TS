/** @format */

export default class Stack<T> {
    private list: T[] = []
    private capacity: number
    private index = -1
    constructor(capacity: number) {
        this.capacity = capacity
    }
    public get top(): T | null {
        if (this.index < 0) {
            return null
        }
        return this.list[this.index]
    }
    public isEmpty(): boolean {
        return this.index < 0
    }
    public isFull(): boolean {
        return this.index === this.capacity - 1
    }
    public pop(): T {
        if (this.isEmpty()) {
            throw Error('Stack is empty.')
        }
        const value = this.list[this.index]
        this.index -= 1
        return value
    }
    public push(element: T): void {
        if (this.isFull()) {
            throw Error('Stack is full')
        }
        this.index += 1
        this.list[this.index] = element
    }
}
