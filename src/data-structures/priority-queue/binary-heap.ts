import { swap } from '../../share/utils';

interface HeapNode {
    value: number,
    [propName: string]: any
}

function percolateDown(list: HeapNode[], i: number, size: number) {
    while (2 * i <= size) {
        let index = 2 * i;
        if (index !== size && list[index].value > list[index + 1].value) {
            index += 1;
        }
        if (list[i].value > list[index].value) {
            swap(list, i, index);
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
 */

export default class BinaryHeap {

    public static create(arr: HeapNode[]): BinaryHeap {
        const binaryHeap = new BinaryHeap();
        const {
            list,
        } = binaryHeap;
        list.push(...arr);
        const len = list.length - 1;
        for (let i = Math.floor(len / 2); i > 0; i--) {
            percolateDown(list, i, len);
        }
        return binaryHeap;
    }
    private list: HeapNode[] = [{ value: Number.MIN_SAFE_INTEGER }];
    public findMin(): HeapNode {
        if (this.isEmpty()) {
            throw Error('Binary heap is empty!');
        }
        return this.list[1];
    }
    public deleteMin(): HeapNode {
        if (this.isEmpty()) {
            throw Error('Binary heap is empty!');
        }
        const {
            list
        } = this;
        const l = list.length - 1;
        const lastElement = list[l];
        const minElement = this.list[1];
        let i = 1;
        for (; i <= Math.floor(l / 2);) {
            let j = i * 2;
            if (j !== l && list[j].value > list[j + 1].value) {
                j = j + 1;
            }
            if (list[j].value < lastElement.value) {
                list[i] = list[j];
                i = j;
            } else {
                break;
            }

        }
        list[i] = lastElement;
        list.pop();
        return minElement;
    }
    public insert(data: HeapNode) {
        const {
            list,
        } = this;
        let i = list.push(data) - 1;
        for (; i > 1;) {
            const j = Math.floor(i / 2);
            if (data.value < list[j].value) {
                list[i] = list[j];
            } else {
                break;
            }
            i = j;
        }
        list[i] = data;
    }
    public isEmpty(): Boolean {
        return this.list.length < 2;
    }
}