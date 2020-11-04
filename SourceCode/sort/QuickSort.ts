/** @format */

import {swap, midian3} from '@/shared/util'
import insertionSort from './InsertionSort'

const CUTOFF = 3

function qSort(n: number[], left: number, right: number): void {
    if (right - left >= CUTOFF) {
        const pivot = midian3(n, left, right)
        let i = left
        let j = right - 1
        while (true) {
            while (n[--j] > pivot) {}
            while (n[++i] < pivot) {}
            if (j > i) {
                swap(n, i, j)
            } else {
                break
            }
        }
        /** 
         * 如果11-21行代码改为下述写法则不能正常运行
         * 因为若n[i]===pivot并且n[j]===pivot则会产生无限循环
         *  let i = left + 1
            let j = right - 2
            while (true) {
                while (n[j] > pivot) {j--}
                while (n[i] < pivot) {i++}
                if (j > i) {
                    swap(n, i, j)
                } else {
                    break
                }
            }
        */
        swap(n, i, right - 1)
        qSort(n, left, i - 1)
        qSort(n, i + 1, right)
    } else {
        insertionSort(n, left, right + 1)
    }
}

export function quickSort(n: number[]): void {
    qSort(n, 0, n.length - 1)
}

function qSelect(n: number[], left: number, right: number, k: number): number {
    if (right - left >= CUTOFF) {
        const pivot = midian3(n, left, right)
        let i = left
        let j = right - 1
        while (true) {
            while (n[++i] < pivot) {}
            while (n[--j] > pivot) {}
            if (i < j) {
                swap(n, i, j)
            } else {
                break
            }
        }
        // ;[1, 2, 3, 4, 5, 6], (k = 3), (i = 4)
        swap(n, i, right - 1)
        if (k === right - i + 1) {
            return n[i]
        }
        if (k <= right - i) {
            return qSelect(n, i + 1, right, k)
        }
        return qSelect(n, left, i - 1, k - (right - i + 1))
    } else {
        const subArray = n.slice(left, right + 1)
        insertionSort(subArray)
        return subArray[subArray.length - k]
    }
}

/**
 * 选择问题
 * 从n中找到第k大元素
 */
export function quickSelect(n: number[], k: number): number {
    return qSelect(n, 0, n.length - 1, k)
}
