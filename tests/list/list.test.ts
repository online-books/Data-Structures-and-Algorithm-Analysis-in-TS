import LinkedList from '@/list/LinkedList'

describe('linked list', () => {
    let list: LinkedList<number>;
    test('list initialization', () => {
        list = new LinkedList();
        expect(list.isEmpty).toBeTruthy()
    })
    test('insert node', () => {
        const node1 = list.insert(4);
        expect(list.isEmpty).toBeFalsy()
        expect(node1.next).toBeNull();
        const node2 = list.insert(3);
        expect(node2.next).toBe(node1);
        const node3 = list.insert(6, node1);
        expect(node3.next).toBe(node1);
    })
    test('find node', () => {
        const node = list.find(3);
        expect(node).not.toBeNull();
        expect(node!.next).not.toBeNull()
        expect(node!.next!.value).toBe(6)
        expect(list.find(5)).toBeNull()
    })
    test('delete node', () => {
        const node3 = list.find(6);
        expect(node3).not.toBeNull()
        expect(node3!.next).not.toBeNull()
        list.delete(node3!.next!);
        expect(node3!.next).toBeNull()
    })
})