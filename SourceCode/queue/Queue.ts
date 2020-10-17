export default class Queue<T>{
    private capacity: T[] = []
    public get size() {
        return this.capacity.length;
    }
    public get frontElement(): T | null {
        if (!this.size) {
            return null;
        }
        return this.capacity[0];
    }
    public enqueue(value: T) {
        this.capacity.push(value);
    }
    public dequeue() {
        return this.capacity.shift();
    }
}