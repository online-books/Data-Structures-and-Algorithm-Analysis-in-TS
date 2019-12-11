import { mergeTwoLists } from '../../easy/linked-list';

import ListNode from '../../../data-structures/linked-list/list-node';
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
    let firstList = lists.shift();
    while (lists.length) {
        firstList = mergeTwoLists(firstList, lists.shift());
    }
    return firstList;
}

/**
 * Sort List
 * Sort a linked list in O(n log n) time using constant space complexity.
 */

export function sortList(head: ListNode): ListNode {

};


