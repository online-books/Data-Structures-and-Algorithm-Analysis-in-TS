/** @format */

export default class Queue<T> {
    private capacity: T[] = []
    public get size(): number {
        return this.capacity.length
    }
    public get frontElement(): T | null {
        if (!this.size) {
            return null
        }
        return this.capacity[0]
    }
    public enqueue(element: T): void {
        this.capacity.push(element)
    }
    public dequeue(): T | undefined {
        return this.capacity.shift()
    }
}
