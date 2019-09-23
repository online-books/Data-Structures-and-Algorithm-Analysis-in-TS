import ListNode from './list-node';
import SingleList from './single-list';

/**
 * Delete Node in a Linked List
 * Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.
 * Example:list = [4,5,1,9], node = 5
 * Output: [4,1,9]
 */
export function deleteNode(node: ListNode, list: SingleList): void {
    let current = list.head;
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
export function removeNthFromEnd(list: SingleList, n: number): SingleList {
    let current = list.head.next;
    let prev: null | ListNode = null;
    let count = 1;
    while (current) {
        if (count === n) {
            prev = list.head;
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
 * Example：
 * Input: 1->2->3->4->5->NULL
 * Output: 5->4->3->2->1->NULL
 */
export function reverseList(list: SingleList): SingleList {
    const stack: ListNode[] = [];
    let currentNode = list.head.next;
    while (currentNode) {
        stack.unshift(currentNode);
        currentNode = currentNode.next;
    }
    currentNode = list.head;
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

export function mergeTwoLists(l1: SingleList, l2: SingleList): SingleList {
    const l = new SingleList();
    let node1 = l1.head.next;
    let node2 = l2.head.next;
    while (node1 && node2) {
        if (node1.val > node2.val) {
            l.insert(node2.val);
            node2 = node2.next;
        } else if (node1.val < node2.val) {
            l.insert(node1.val);
            node1 = node1.next;
        } else {
            l.insert(node2.val);
            node2 = node2.next;
            l.insert(node1.val);
            node1 = node1.next;
        }
    }
    while (node1) {
        l.insert(node1.val);
        node1 = node1.next;
    }
    while (node2) {
        l.insert(node2.val);
        node2 = node2.next;
    }
    return l;
}

/**
 *  Palindrome Linked List
 *  Given a singly linked list, determine if it is a palindrome.
 *  Example：
 *  Input: 1->2,1->2->2->1
 *  Output: false,true
 */
export function isPalindrome(list: SingleList): boolean {
    const arr = [];
    let node = list.head.next;
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

export function hasCycle(list: SingleList): boolean {
    let step1 = list.head.next;
    let step2 = list.head.next;
    while (step1 && step2 && step1.next && step2.next) {
        step1 = step1.next;
        step2 = step2.next.next;
        if (step2 === step1) {
            return true;
        }
    }
    return false;
}