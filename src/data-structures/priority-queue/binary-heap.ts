import { swap } from '../../share/utils';

function percolateDown(data: any[], i: number, size: number) {
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

/**
 * 二叉堆是-棵被完全填满的二叉树，用数组表示。
 * 结构性质：对于数组任意一个位置i上的元素，其左儿子在位置2i上，右儿子在（2i+1）上，它的父元素在（i/2）上。
 * 堆序性质：对于每一个节点X，X的父元素的关键字小于或等于X中的关键字，根结点除外。
 * 堆的基本操作：插入、删除最小元、构建堆
 * TODO:delete
 */

export default class BinaryHeap {

    public static create(arr: number[]): BinaryHeap {
        const binaryHeap = new BinaryHeap();
        const {
            data,
        } = binaryHeap;
        data.push(...arr);
        const len = data.length;
        for (let i = Math.floor(len / 2); i > 0; i--) {
            percolateDown(data, i, len);
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
    public delete(val: any): void {

    }
    public isEmpty(): Boolean {
        return this.data.length < 2;
    }
}