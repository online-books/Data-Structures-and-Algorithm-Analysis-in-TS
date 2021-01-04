/** @format */

export default class Queue<T> {
    private front = 0
    private rear = -1
    private capacity: number
    private list: T[] = []
    private size = 0
    constructor(capaticy: number) {
        this.capacity = capaticy
    }
    public isFull(): boolean {
        return this.size === this.capacity
    }
    public isEmpty(): boolean {
        return this.size === 0
    }
    public enqueue(element: T): void {
        if (this.isFull()) {
            throw Error('Queue is full.')
        }
        this.rear = this.succ(this.rear)
        this.list[this.rear] = element
        this.size += 1
    }
    public dequeue(): T {
        if (this.isEmpty()) {
            throw Error('Queue is empty.')
        }
        const value = this.list[this.front]
        this.front = this.succ(this.front)
        this.size -= 1
        return value
    }
    public exist(element: T): boolean {
        return this.list.includes(element)
    }
    private succ(index: number) {
        if (++index == this.capacity) {
            index = 0
        }
        return index
    }
}
