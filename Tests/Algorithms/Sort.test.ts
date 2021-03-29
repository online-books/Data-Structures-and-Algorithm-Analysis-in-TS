/** @format */

import heapSort from '@/Sort/HeapSort'
import insertionSort from '@/Sort/InsertionSort'
import mergeSort from '@/Sort/MergeSort'
import shellSort from '@/Sort/ShellSort'
import { generateRandomNumberArray } from '@/Shared/Util'
import { quickSort, quickSelect } from '@/Sort/QuickSort'

describe('sort', () => {
    const MAX_NUM = 5e4
    const MIN_NUM = 1
    const LAST_INDEX = MAX_NUM - MIN_NUM
    let data: number[]
    let startTime: number
    let endTime: number
    beforeEach(() => {
        data = generateRandomNumberArray(MIN_NUM, MAX_NUM)
        startTime = Date.now()
    })
    afterEach(() => {
        endTime = Date.now()
        console.log('【Time used】:', endTime - startTime)
    })
    test.skip('Insertion Sort', () => {
        insertionSort(data)
        expect(data[0]).toBe(MIN_NUM)
        expect(data[LAST_INDEX]).toBe(MAX_NUM)
    })
    test.skip('Shell Sort', () => {
        shellSort(data)
        expect(data[0]).toBe(MIN_NUM)
        expect(data[LAST_INDEX]).toBe(MAX_NUM)
    })
    test.skip('Heap Sort', () => {
        heapSort(data)
        expect(data[0]).toBe(MIN_NUM)
        expect(data[LAST_INDEX]).toBe(MAX_NUM)
    })
    test.skip('Merge Sort', () => {
        mergeSort(data)
        expect(data[0]).toBe(MIN_NUM)
        expect(data[LAST_INDEX]).toBe(MAX_NUM)
    })
    test.skip('Quick Sort', () => {
        quickSort(data)
        expect(data[0]).toBe(MIN_NUM)
        expect(data[LAST_INDEX]).toBe(MAX_NUM)
    })
    test('Quick Select Maximum Number', () => {
        expect(quickSelect(data, 1)).toBe(MAX_NUM)
    })
    test('Quick Select Minimum Number', () => {
        expect(quickSelect(data, LAST_INDEX + 1)).toBe(MIN_NUM)
    })
    test.only('Quick Select N/2 Number', () => {
        expect(quickSelect(data, Math.ceil(MAX_NUM / 2))).toBeLessThanOrEqual(MAX_NUM)
    })
})
