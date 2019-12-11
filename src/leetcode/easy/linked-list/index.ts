
import ListNode from '../../../data-structures/linked-list/list-node';

/**
 * Delete Node in a Linked List
 * Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.
 */
export function deleteNode(node: ListNode, list: ListNode): void {
    let current = list;
    while (current && current.next) {
        if (current.next.val === node.val) {
            const next = current.next.next;
            current.next = next;
            return;
        }
        current = current.next;
    }
}

/**
 * Remove Nth Node From End of List
 * Given a linked list, remove the n-th node from the end of list and return its head.
 */
export function removeNthFromEnd(list: ListNode, n: number): ListNode {
    let current = list.next;
    let prev: null | ListNode = null;
    let count = 1;
    while (current) {
        if (count === n) {
            prev = list;
        } else if (count > n) {
            if (prev) {
                prev = prev.next;
            }
        }
        current = current.next;
        count += 1;
    }
    if (prev && prev.next) {
        prev.next = prev.next.next;
    }
    return list;
}

/**
 * 
 * Reverse a singly linked list.
 */
export function reverseList(list: ListNode): ListNode {
    const stack: ListNode[] = [];
    let currentNode = list.next;
    while (currentNode) {
        stack.unshift(currentNode);
        currentNode = currentNode.next;
    }
    currentNode = list;
    while (stack.length) {
        currentNode.next = stack.shift() as ListNode;
        currentNode = currentNode.next;
    }
    currentNode.next = null;
    return list;
}


/**
 * Merge Two Sorted Lists
 * Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
 */

export function mergeTwoLists(l1: ListNode, l2: ListNode): ListNode {
    const list = new ListNode(0);
    let node1 = l1;
    let node2 = l2;
    let cur = list;
    while (node1 && node2) {
        if (node1.val > node2.val) {
            cur.next = node2;
            node2 = node2.next;
        } else {
            cur.next = node1;
            node1 = node1.next;
        }
        cur = cur.next;
    }
    if (node1) {
        cur.next = node1;
    }
    if (node2) {
        cur.next = node2;
    }
    return list.next;
}

/**
 *  Palindrome Linked List
 *  Given a singly linked list, determine if it is a palindrome.
 */
export function isPalindrome(list: ListNode): boolean {
    const arr = [];
    let node = list;
    while (node) {
        arr.push(node.val)
        node = node.next;
    }
    const {
        length
    } = arr;
    const middle = Math.floor(length / 2);
    for (let i = 0; i < middle; i++) {
        if (arr[i] !== arr[length - i - 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Linked List Cycle
 * Given a linked list, determine if it has a cycle in it.
 */

export function hasCycle(list: ListNode): boolean {
    let step1 = list.next;
    let step2 = list.next;
    while (step1 && step2 && step1.next && step2.next) {
        step1 = step1.next;
        step2 = step2.next.next;
        if (step2 === step1) {
            return true;
        }
    }
    return false;
}