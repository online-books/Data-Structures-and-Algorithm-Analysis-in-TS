
import { swap } from '../../utils/index';

export default class BinaryHeap {

    public static create(arr: number[]): BinaryHeap {
        const binaryHeap = new BinaryHeap();
        const {
            data,
        } = binaryHeap;
        data.push(...arr);
        const len = data.length;
        for (let i = Math.floor(len / 2); i > 0; i--) {
            binaryHeap.percolateDown(data, i, len);
        }
        return binaryHeap;
    }
    private data: number[] = [Number.MIN_SAFE_INTEGER];
    public findMin(): number {
        if (this.isEmpty()) {
            throw Error('Binary heap is empty!');
        }
        return this.data[1];
    }
    public deleteMin() {
        if (this.isEmpty()) {
            throw Error('Binary heap is empty!');
        }
        const {
            data
        } = this;
        const l = data.length;
        const lastElement = data[l - 1];
        let i = 1;
        for (; i <= Math.floor(l / 2);) {
            let j = i * 2;
            if (j !== l && data[j] > data[j + 1]) {
                j = j + 1;
            }
            if (data[j] < lastElement) {
                data[i] = data[j];
                i = j;
            } else {
                break;
            }

        }
        data[i] = lastElement;
        data.pop();
    }
    public insert(value: any) {
        const {
            data,
        } = this;
        const len = data.push(value);
        let i = len - 1;
        for (; i > 1;) {
            const j = Math.floor(i / 2);
            if (value < data[j]) {
                data[i] = data[j];
            } else {
                break;
            }
            i = j;
        }
        data[i] = value;
    }
    public isEmpty(): Boolean {
        return this.data.length < 2;
    }
    public empty() {
        this.data.length = 1;
    }
    private percolateDown(data: any[], i: number, size: number) {
        while (2 * i <= size) {
            let index = 2 * i;
            if (index !== size && data[index] > data[index + 1]) {
                index += 1;
            }
            if (data[i] > data[index]) {
                swap(data, i, index);
            } else {
                break;
            }
            i = index;
        }
    }
}