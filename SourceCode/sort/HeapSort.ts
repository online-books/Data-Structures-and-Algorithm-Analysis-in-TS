import BinaryHeap from '../priority-queue/BinaryHeap';


export function heapSort(arr: number[]) {
    const heap = new BinaryHeap(arr);
    let i = 0;
    while (heap.size) {
        const min = heap.deleteMin();
        arr[i] = min;
        i += 1;
    }
    return arr;
}