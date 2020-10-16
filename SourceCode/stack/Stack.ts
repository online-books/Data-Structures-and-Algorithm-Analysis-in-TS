export default class Stack<T>{
    private capacity: T[] = []
    public get size() {
        return this.capacity.length;
    }
    public pop() {
        this.capacity.pop();
    }
    public push(value: T) {
        this.capacity.push(value);
    }
}