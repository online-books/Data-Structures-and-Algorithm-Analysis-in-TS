/** @format */

import BinaryHeap from '../PriorityQueue/BinaryHeap'

export default function heapSort(n: number[]): void {
    const heap = new BinaryHeap(n)
    let i = 0
    while (heap.size) {
        const min = heap.deleteMin()
        n[i] = min
        i += 1
    }
}
