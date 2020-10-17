export default class Stack<T>{
    private capacity: T[] = []
    public get size() {
        return this.capacity.length;
    }
    public get topElement(): T | null {
        if (!this.size) {
            return null;
        }
        return this.capacity[this.size - 1];
    }
    public pop() {
        return this.capacity.pop();
    }
    public push(element: T) {
        this.capacity.push(element);
    }
}