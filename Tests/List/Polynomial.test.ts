/** @format */

import LinkedList from '@/List/LinkedList/LinkedList'
import {add, mul, Polynomial} from '@/List/LinkedList/Polynomial'

function buildPolynomial(data: [number, number][], l: LinkedList<Polynomial>) {
    let node = l.firstNode
    data.forEach(([coeff, power]) => {
        node = l.insert(
            {
                coeff,
                power,
            },
            node,
        )
    })
}

function getPlolynomialData(l: LinkedList<Polynomial>): [number, number][] {
    const data: [number, number][] = []
    l.traverse(p => {
        data.push([p.coeff, p.power])
    })
    return data
}

describe('Polynomial', () => {
    let l1: LinkedList<Polynomial>
    let l2: LinkedList<Polynomial>
    let l3: LinkedList<Polynomial>
    beforeEach(() => {
        l1 = new LinkedList<Polynomial>()
        l2 = new LinkedList<Polynomial>()
        l3 = new LinkedList<Polynomial>()
        buildPolynomial(
            [
                [1, 5],
                [2, 3],
                [3, 2],
            ],
            l1,
        )
        buildPolynomial(
            [
                [2, 4],
                [1, 1],
            ],
            l2,
        )
        buildPolynomial(
            [
                [4, 5],
                [6, 0],
            ],
            l3,
        )
    })
    test('add', () => {
        const newL1 = add(l1, l2)
        const newL2 = add(l3, newL1)
        const data = [
            [6, 0],
            [1, 1],
            [3, 2],
            [2, 3],
            [2, 4],
            [5, 5],
        ]
        expect(getPlolynomialData(newL2)).toStrictEqual(data)
        expect(getPlolynomialData(add(newL2, new LinkedList<Polynomial>()))).toStrictEqual(data)
        expect(getPlolynomialData(add(new LinkedList<Polynomial>(), newL2))).toStrictEqual(data)
    })
    test('mul', () => {
        const newL = mul(l1, l2)
        const data = [
            [3, 3],
            [2, 4],
            [7, 6],
            [4, 7],
            [2, 9],
        ]
        expect(getPlolynomialData(newL)).toStrictEqual(data)
        expect(getPlolynomialData(mul(newL, new LinkedList<Polynomial>()))).toStrictEqual(data)
        expect(getPlolynomialData(mul(new LinkedList<Polynomial>(), newL))).toStrictEqual(data)
    })
})
