/** @format */

import LinkedList from '@/list/linked-list/LinkedList'

describe('linked list', () => {
    describe('linked list implementation', () => {
        let list: LinkedList<number>
        test('list initialization', () => {
            list = new LinkedList()
            expect(list).toBeInstanceOf(LinkedList)
            expect(list.size).toBe(0)
            expect(list.firstNode).toBeNull()
        })
        test('insert node', () => {
            const node1 = list.insert(4)
            expect(list.size).toBe(1)
            expect(list.firstNode!.element).toBe(4)
            expect(node1.next).toBeNull()
            const node2 = list.insert(3)
            expect(list.size).toBe(2)
            expect(list.firstNode!.element).toBe(3)
            expect(node2.next).toBe(node1)
            const node3 = list.insert(6, node1)
            expect(list.size).toBe(3)
            expect(node3.next).toBeNull()
            expect(node1!.next!.element).toBe(6)
        })
        test('find node', () => {
            const node2 = list.find(element => element === 3)
            expect(node2).not.toBeNull()
            expect(node2!.next).not.toBeNull()
            expect(node2!.next!.element).toBe(4)
            expect(list.find(element => element === 5)).toBeNull()
        })
        test('delete node', () => {
            const node1 = list.find(element => element === 4)
            const node2 = list.find(element => element === 3)
            list.delete(node1!)
            expect(list.size).toBe(2)
            expect(node2!.next!.element).toBe(6)
            list.delete(node1!)
            expect(list.size).toBe(2)
        })
    })
})
