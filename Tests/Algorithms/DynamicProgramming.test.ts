/** @format */

import optMatrix from '@/Algorithms/DynamicProgramming/OptMatrix'
import optBST, {Word} from '@/Algorithms/DynamicProgramming/OptBST'

describe('dynamic programming', () => {
    test('opt matrix', () => {
        expect(optMatrix([50, 10, 40, 30, 5])).toBe(10500)
        expect(optMatrix([5])).toBe(0)
        expect(optMatrix([10, 10])).toBe(100)
    })
    test('opt bst', () => {
        const words: Word[] = [
            {character: 'a', probability: 0.22},
            {character: 'am', probability: 0.18},
            {character: 'and', probability: 0.2},
            {character: 'egg', probability: 0.05},
            {character: 'if', probability: 0.25},
            {character: 'the', probability: 0.02},
            {character: 'rwo', probability: 0.08},
        ]
        expect(optBST(words)).toEqual(2.15)
    })
})
