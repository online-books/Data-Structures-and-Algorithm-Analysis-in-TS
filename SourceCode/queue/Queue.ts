export default class Queue<T>{
    private capacity: T[] = []
    public get size() {
        return this.capacity.length;
    }
    public enqueue(value: T) {
        this.capacity.push(value);
    }
    public dequeue() {
        this.capacity.unshift();
    }
}