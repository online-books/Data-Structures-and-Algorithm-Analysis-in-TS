import { mergeTwoSortedLists } from '../../easy/linked-list';

import ListNode from '@src/data-structures/linked-list/list-node';
/**
 * Merge k Sorted Lists
 * Merge k sorted linked lists and return it as one sorted list. 
 * Analyze and describe its complexity.
 */

export function mergeKLists(lists: ListNode[]): ListNode | null {
    const {
        length
    } = lists;
    if (!length) {
        return null;
    }
    let firstList = lists.shift()!;
    while (lists.length) {
        firstList = mergeTwoSortedLists(firstList, lists.shift()!)!;
    }
    return firstList;
}

/**
 * Sort List
 * Sort a linked list in O(n log n) time using constant space complexity.
 */

export function sortList(head: ListNode): ListNode {
    if (head === null || head.next === null) {
        return head;
    }
    let prev = head;
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        prev = slow;
        slow = slow.next!;
        fast = fast.next.next!;
    }
    prev.next = null;
    const l1 = sortList(head);
    const l2 = sortList(slow);
    return mergeTwoSortedLists(l1, l2)!;
};


