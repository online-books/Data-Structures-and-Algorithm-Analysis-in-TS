/** @format */

import calculate, {infix2Postfix} from '@/Stack/Calculate'

describe('Calculate', () => {
    test('Infix to Postfix', () => {
        expect(infix2Postfix('1+20*30+(43*5+62)*71')).toStrictEqual([
            '1',
            '20',
            '30',
            '*',
            '+',
            '43',
            '5',
            '*',
            '62',
            '+',
            '71',
            '*',
            '+',
        ])
    })
    test('Postfix Expression', () => {
        expect(calculate('5*2+3+4*1')).toBe(17)
        expect(calculate('(1+(1+5)/3-4/2)*2')).toBe(2)
    })
})
