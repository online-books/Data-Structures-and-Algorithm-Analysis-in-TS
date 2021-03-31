/** @format */

import fs from 'fs'
import path from 'path'

import heapSort from '@/Sort/HeapSort'
import insertionSort from '@/Sort/InsertionSort'
import mergeSort from '@/Sort/MergeSort'
import shellSort from '@/Sort/ShellSort'
import {quickSort, quickSelect} from '@/Sort/QuickSort'

function isIncrease(data: number[]): boolean {
    for (let i = 1, l = data.length; i < l; i++) {
        if (data[i] < data[i - 1]) {
            return false
        }
    }
    return true
}

const readData = (() => {
    let data: number[]
    return (): number[] => {
        if (data) {
            return data.slice()
        }
        const result = fs.readFileSync(path.resolve(process.cwd(), 'Assets/Data/sort.json'), {encoding: 'utf-8'})
        data = JSON.parse(result).data
        return data.slice()
    }
})()

describe('sort', () => {
    let data: number[] = readData()
    let minNum = Infinity
    let maxNum = 0
    data.forEach(value => {
        if (value > maxNum) {
            maxNum = value
        }
        if (value < minNum) {
            minNum = value
        }
    })
    const count = data.length
    let startTime: number
    let endTime: number
    beforeEach(() => {
        data = readData()
        startTime = Date.now()
    })
    afterEach(() => {
        endTime = Date.now()
        console.log('【Time used】:', endTime - startTime)
    })
    test('Insertion Sort', () => {
        insertionSort(data)
        expect(data[0]).toBe(minNum)
        expect(data[count - 1]).toBe(maxNum)
        expect(isIncrease(data)).toBeTruthy()
    })
    test('Shell Sort', () => {
        shellSort(data)
        expect(data[0]).toBe(minNum)
        expect(data[count - 1]).toBe(maxNum)
        expect(isIncrease(data)).toBeTruthy()
    })
    test('Heap Sort', () => {
        heapSort(data)
        expect(data[0]).toBe(minNum)
        expect(data[count - 1]).toBe(maxNum)
        expect(isIncrease(data)).toBeTruthy()
    })
    test('Merge Sort', () => {
        mergeSort(data)
        expect(data[0]).toBe(minNum)
        expect(data[count - 1]).toBe(maxNum)
        expect(isIncrease(data)).toBeTruthy()
    })
    test('Quick Sort', () => {
        quickSort(data)
        expect(data[0]).toBe(minNum)
        expect(data[count - 1]).toBe(maxNum)
        expect(isIncrease(data)).toBeTruthy()
    })
    test('Quick Select', () => {
        expect(quickSelect(readData(), 1)).toBe(maxNum)
        expect(quickSelect(data, 3)).toBe(99997)
        expect(quickSelect(data, maxNum)).toBe(minNum)
    })
})
