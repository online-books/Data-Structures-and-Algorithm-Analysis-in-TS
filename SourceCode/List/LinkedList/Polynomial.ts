/** @format */

import LinkedList from './LinkedList'

export interface Polynomial {
    power: number
    coeff: number
}

type PolynomialOperation = (l1: LinkedList<Polynomial>, l2: LinkedList<Polynomial>) => LinkedList<Polynomial>

export const add: PolynomialOperation = (l1, l2) => {
    const newList = new LinkedList<Polynomial>()
    let prevNode = newList.firstNode
    let n1 = l1.firstNode
    let n2 = l2.firstNode
    if (!n1) {
        return l2
    }
    if (!n2) {
        return l1
    }
    while (n1 && n2) {
        const p: Polynomial = {
            power: 0,
            coeff: 0,
        }
        const e1 = n1.element
        const e2 = n2.element
        if (e1.power === e2.power) {
            p.power = e1.power
            p.coeff = e1.coeff + e2.coeff
            n1 = n1.next
            n2 = n2.next
        } else if (e1.power < e2.power) {
            p.power = e2.power
            p.coeff = e2.coeff
            n2 = n2.next
        } else {
            p.power = e1.power
            p.coeff = e1.coeff
            n1 = n1.next
        }
        prevNode = newList.insert(p, prevNode)
    }
    while (n1) {
        prevNode = newList.insert(
            {
                ...n1.element,
            },
            prevNode,
        )
        n1 = n1.next
    }
    while (n2) {
        prevNode = newList.insert(
            {
                ...n2.element,
            },
            prevNode,
        )
        n2 = n2.next
    }
    return newList
}

export const mul: PolynomialOperation = (l1, l2) => {
    let n1 = l1.firstNode
    let n2 = l2.firstNode
    if (!n1) {
        return l2
    }
    if (!n2) {
        return l1
    }
    let lists: LinkedList<Polynomial>[] = []
    while (n1) {
        const l = new LinkedList<Polynomial>()
        let prevNode = l.firstNode
        n2 = l2.firstNode
        while (n2) {
            const e1 = n1.element
            const e2 = n2.element
            prevNode = l.insert(
                {
                    coeff: e1.coeff * e2.coeff,
                    power: e1.power + e2.power,
                },
                prevNode,
            )
            n2 = n2.next
        }
        n1 = n1.next
        lists.push(l)
    }
    while (lists.length > 1) {
        const l1 = lists.pop()!
        const l2 = lists.pop()!
        const newL = add(l1, l2)
        lists.unshift(newL)
    }
    return lists[0]
}
