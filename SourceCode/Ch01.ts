/** @format */

import {compareFn} from '@/Shared/Util'

// 选择问题，解法1
export function kThMaximumSelection1(n: number[], k: number): number {
    if (n.length <= k || k < 1) {
        throw new RangeError('k is out of range')
    }
    return n.sort(compareFn())[k - 1]
}

// 选择问题，解法2
export function kThMaximumSelection2(n: number[], k: number): number {
    if (n.length < k || k < 1) {
        throw new RangeError('k is out of range')
    }
    const kSorted = n.splice(0, k).sort(compareFn())
    while (n.length) {
        const value = n.pop()!
        let i = k - 1
        while (value > kSorted[i]) {
            i -= 1
            if (i >= 0) {
                kSorted[i + 1] = kSorted[i]
            }
        }
        if (i !== k - 1) {
            kSorted[i + 1] = value
        }
    }
    return kSorted[k - 1]
}

export function F(x: number): number {
    // 基准情形
    if (x === 0) {
        return 0
    }
    // 不断推进
    return (2 * F(x - 1) + x) ^ 2
}
