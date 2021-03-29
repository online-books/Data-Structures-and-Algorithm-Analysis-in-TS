import { swap, midian3 } from '@/Shared/Util'
import insertionSort from './InsertionSort'

const CUTOFF = 3

function qSort(n: number[], left: number, right: number): void {
    if (right - left >= CUTOFF) {
        const pivot = midian3(n, left, right)
        let i = left
        let j = right - 1
        while (true) {
            while (n[--j] > pivot) { }
            while (n[++i] < pivot) { }
            if (j > i) {
                swap(n, i, j)
            } else {
                break
            }
        }
        swap(n, i, right - 1)
        qSort(n, left, i - 1)
        qSort(n, i + 1, right)
    } else {
        insertionSort(n, left, right + 1)
    }
}

/**
 * 快速排序算法
 * @param {number[]} n 
 */
export function quickSort(n: number[]): void {
    qSort(n, 0, n.length - 1)
}

function qSelect(n: number[], left: number, right: number, k: number): number {
    if (right - left >= CUTOFF) {
        const pivot = midian3(n, left, right)
        let i = left
        let j = right - 1
        while (true) {
            while (n[++i] < pivot) { }
            while (n[--j] > pivot) { }
            if (i < j) {
                swap(n, i, j)
            } else {
                break
            }
        }
        swap(n, i, right - 1)
        if (k === i + 1) {
            return n[i]
        } else if (k <= right - i + 1) {
            return qSelect(n, i, right, k)
        }
        return qSelect(n, left, i - 1, k - (right - i + 1))
    } else {
        const subArray = n.slice(left, right + 1)
        insertionSort(subArray)
        return subArray[subArray.length - k]
    }
}

/**
 * 快速选择算法
 * @param {number[]} n
 * @param {number} k 
 * @returns {number}
 */
export function quickSelect(n: number[], k: number): number {
    return qSelect(n, 0, n.length - 1, k)
}
