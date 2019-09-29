import {
    deleteNode,
    isPalindrome,
    mergeTwoLists,
    removeNthFromEnd,
    reverseList,
} from './index';

import SingleList from '../../lib/single-list/index';
import ListNode from '../../lib/single-list/list-node';


describe('easy => Linked List', () => {
    test('Delete Node in a Linked List', () => {
        const list = new SingleList();
        const node = new ListNode(5);
        [4, 5, 1, 9].map(val => list.insert(val));
        deleteNode(node, list);
        const next = list.head.next as ListNode;
        expect((next.next as ListNode).val).toBe(1);
    });
    test('Remove Nth Node From End of List', () => {
        const list1 = new SingleList();
        list1.insert(1);
        removeNthFromEnd(list1, 1);
        expect(list1.head.next).toBe(null);
        const list2 = new SingleList();
        [4, 5, 1, 9].map(val => list2.insert(val));
        removeNthFromEnd(list2, 2);
        expect(list2.find(1)).toBe(null);
    });
    test('Reverse Linked List', () => {
        const list = new SingleList();
        [1, 2, 3, 4, 5].map(val => list.insert(val));
        const reversedList = reverseList(list);
        expect((reversedList.head.next as ListNode).val).toBe(5);
    });
    test('Merge Two Sorted Lists', () => {
        const l1 = new SingleList();
        [1, 2, 4].map(val => l1.insert(val));
        const l2 = new SingleList();
        [1, 3, 4].map(val => l2.insert(val));
        const mergedList = mergeTwoLists(l1, l2);
        const stack = [];
        let node = mergedList.head.next;
        while (node) {
            stack.push(node.val);
            node = node.next;
        }
        expect(stack).toEqual([1, 1, 2, 3, 4, 4]);
    });
    test('Palindrome Linked List', () => {
        const l1 = new SingleList();
        [-129, -129].map(val => l1.insert(val));
        const l2 = new SingleList();
        [1, 2, 2, 1].map(val => l2.insert(val));
        const l3 = new SingleList();
        [1, 2, 4, 2, 1].map(val => l3.insert(val));
        expect(isPalindrome(l1)).toBeTruthy();
        expect(isPalindrome(l2)).toBeTruthy();
        expect(isPalindrome(l3)).toBeTruthy();
    })
})
