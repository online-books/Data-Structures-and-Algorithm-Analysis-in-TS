/** @format */

import {maxSubSequenceSum1, maxSubSequenceSum2, maxSubSequenceSum3} from '@/Ch02'

describe('Ch02', () => {
    describe('Max subsequence sum', () => {
        const n = [-2, 11, -4, 13, -5, -2]
        test('solution 1', () => {
            expect(maxSubSequenceSum1(n)).toBe(20)
        })
        test('solution 2', () => {
            expect(maxSubSequenceSum2(n)).toBe(20)
            expect(maxSubSequenceSum2([])).toBe(0)
        })
        test('solution 3', () => {
            expect(maxSubSequenceSum3(n)).toBe(20)
        })
    })
})
