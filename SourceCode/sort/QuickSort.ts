/** @format */

import {swap, midian3} from '@/shared/util'
import insertionSort from './InsertionSort'

const CUTOFF = 3

function qSort(n: number[], start: number, end: number): void {
    if (end - start >= CUTOFF) {
        const pivot = midian3(n, start, end)
        let i = start
        let j = end - 1
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
         *  let i = start
            let j = end - 1
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
        swap(n, i, end - 1)
        qSort(n, start, i - 1)
        qSort(n, i + 1, end)
    } else {
        insertionSort(n, start, end + 1)
    }
}

export function quickSort(n: number[]): void {
    qSort(n, 0, n.length - 1)
}
