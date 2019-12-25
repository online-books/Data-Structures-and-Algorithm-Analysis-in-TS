import {
    addTwoNumbers,
    oddEvenList,
} from './index';

import ListNode from '@src/data-structures/linked-list/list-node';
import { buildList } from '@src/data-structures/linked-list/single-list';

describe('Linked List', () => {
    const l1 = new ListNode(1);
    const l2 = new ListNode(9);
    l2.next = new ListNode(9);
    test('Add Two Numbers', () => {
        const arr = [];
        let result: ListNode | null = addTwoNumbers(l1, l2);
        while (result) {
            arr.push(result.val);
            result = result.next;
        }
        expect(arr).toEqual([0, 0, 1]);
    });
    test('Odd Even Linked List', () => {
        const list = buildList([1, 2, 3, 4])
        oddEvenList(list);
    });
})