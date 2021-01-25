/** @format */

import {huffmanCode} from '@/Algorithms/Greedy/HuffmanCode'

describe('Greedy algorithm', () => {
    test('Huffman code', () => {
        const NUM = 58
        const chars =
            'a'.repeat(10) + 'e'.repeat(15) + 'i'.repeat(12) + 's'.repeat(3) + 't'.repeat(4) + ' '.repeat(13) + '\n'
        expect(NUM).toBe(58)
        const node = huffmanCode(chars)
        expect(node.key).toBe(NUM)
    })
})
