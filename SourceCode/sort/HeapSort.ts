/** @format */

import BinaryHeap from '../priority-queue/BinaryHeap'

export function heapSort(n: number[]): void {
    const heap = new BinaryHeap(n)
    let i = 0
    while (heap.size) {
        const min = heap.deleteMin()
        n[i] = min
        i += 1
    }
}
