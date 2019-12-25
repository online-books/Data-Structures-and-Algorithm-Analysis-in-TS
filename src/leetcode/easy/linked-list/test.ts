import {
    deleteNode,
    isPalindrome,
    mergeTwoSortedLists,
    removeNthFromEnd,
    reverseList,
} from './index';

import ListNode from '@src/data-structures/linked-list/list-node';
import { buildList } from '@src/data-structures/linked-list/single-list';
import { getValuesFromList } from '@src/share/utils';


describe('easy => Linked List', () => {
    test('Delete Node in a Linked List', () => {
        const list = buildList([4, 5, 1, 9]);
        const node = new ListNode(5);
        deleteNode(node, list);
        const next = list.next;
        expect(next.next.val).toBe(9);
    });
    test('Remove Nth Node From End of List', () => {
        const list1 = new ListNode(1);
        removeNthFromEnd(list1, 1);
        expect(list1.next).toBe(null);
        let list2 = buildList([4, 5, 1, 9]);
        list2 = removeNthFromEnd(list2, 2);
        expect(list2.next.next.val).toBe(9);
    });
    test('Reverse Linked List', () => {
        const list = buildList([1, 2, 3, 4, 5]);
        const reversedList = reverseList(list);
        expect((reversedList.next).val).toBe(5);
    });
    test('Merge Two Sorted Lists', () => {
        const l1 = buildList([1, 2, 4]);
        const l2 = buildList([1, 3, 4]);
        const mergedList = mergeTwoSortedLists(l1, l2);
        const values = getValuesFromList(mergedList);
        expect(values).toEqual([1, 1, 2, 3, 4, 4]);
    });
    test('Palindrome Linked List', () => {
        const l1 = buildList([-129, -129]);
        const l2 = buildList([1, 2, 2, 1]);
        const l3 = buildList([1, 2, 4, 2, 1]);
        expect(isPalindrome(l1)).toBeTruthy();
        expect(isPalindrome(l2)).toBeTruthy();
        expect(isPalindrome(l3)).toBeTruthy();
    })
})
