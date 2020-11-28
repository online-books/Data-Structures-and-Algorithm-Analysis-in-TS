/** @format */

import {F, kThMaximumSelection1, kThMaximumSelection2} from '@/Ch01'

describe('Ch01', () => {
    describe('kth maximum selection 1', () => {
        const data = [1, 6, 3, 7, 2, 5, 8, 4, 9, 0]
        test('the 2th maximum number', () => {
            const result = kThMaximumSelection1(data, 2)
            expect(result).toBe(8)
        })
        test('k is out of range', () => {
            expect(() => {
                kThMaximumSelection1(data, 0)
            }).toThrow(RangeError)
            expect(() => {
                kThMaximumSelection1(data, data.length + 1)
            }).toThrow(RangeError)
        })
    })
    describe('kth maximum selection 2', () => {
        test('the 5th maximum number', () => {
            const data = [1, 6, 3, 7, 2, 5, 8, 4, 9, 0]
            const result = kThMaximumSelection2(data, 4)
            expect(result).toBe(6)
        })
        test('k is out of range', () => {
            const data = [1, 6, 3, 7, 2, 5, 8, 4, 9, 0]
            expect(() => {
                kThMaximumSelection2(data, 0)
            }).toThrow(RangeError)
            expect(() => {
                kThMaximumSelection2(data, data.length + 1)
            }).toThrow(RangeError)
        })
    })
    describe('recursion', () => {
        test('calculate number', () => {
            expect(F(2)).toBe(10)
        })
    })
})
