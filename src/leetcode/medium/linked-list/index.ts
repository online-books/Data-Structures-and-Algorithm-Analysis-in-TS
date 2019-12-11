
import ListNode from '../../../data-structures/linked-list/list-node';
/**
 * Add Two Numbers
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The digits are stored in reverse order and each of their nodes contain a single digit. 
 * Add the two numbers and return it as a linked list.
 */
export function addTwoNumbers(l1: ListNode, l2: ListNode): ListNode {
    let node1: ListNode | null = l1;
    let node2: ListNode | null = l2;
    let result!: ListNode;
    let node!: ListNode;
    let isBiggerThan10 = false;
    while (node1 && node2) {
        let sum = node1.val + node2.val;
        if (isBiggerThan10) {
            sum += 1;
            isBiggerThan10 = false;
        }
        if (sum >= 10) {
            sum = sum % 10;
            isBiggerThan10 = true;
        }
        if (!result) {
            result = new ListNode(sum);
            node = result;
        } else {
            node.next = new ListNode(sum);
            node = node.next;
        }
        node1 = node1.next;
        node2 = node2.next;
    }
    if (!node1 && !node2 && isBiggerThan10) {
        node.next = new ListNode(1);
        isBiggerThan10 = false;
    }
    while (node1) {
        let value = node1.val;
        if (isBiggerThan10) {
            value += 1;
            if (value >= 10) {
                value = 0;
            } else {
                isBiggerThan10 = false;
            }
        }
        node.next = new ListNode(value);
        node = node.next;
        node1 = node1.next;
    }
    while (node2) {
        let value = node2.val;
        if (isBiggerThan10) {
            value += 1;
            if (value >= 10) {
                value = 0;
            } else {
                isBiggerThan10 = false;
            }
        }
        node.next = new ListNode(value);
        node = node.next;
        node2 = node2.next;
    }
    if (isBiggerThan10) {
        node.next = new ListNode(1);
    }
    return result;
}

/**
 * Odd Even Linked List
 * Given a singly linked list, group all odd nodes together followed by the even nodes. 
 * Please note here we are talking about the node number and not the value in the nodes.
 * You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.
 */
export function oddEvenList(head: ListNode): ListNode {
    let node: ListNode | null = head;
    let current: ListNode | null = head;
    while (node && node.next) {
        node = node.next;
        if (!node.next) {
            break;
        }
        const temp = current.next;
        current.next = node.next;
        node.next = current.next!.next;
        current.next!.next = temp;
        current = current.next!;
    }
    return head;
}

/**
 * Intersection of Two Linked Lists
 * Find the node at which the intersection of two singly linked lists begins.
 */
export function getIntersectionNode(headA: ListNode, headB: ListNode): ListNode | null {
    let lenA = 1;
    let lenB = 1;
    let nodeA = headA;
    let nodeB = headB;
    if (!nodeA || !nodeB) {
        return null;
    }
    while (nodeA.next) {
        nodeA = nodeA.next;
        lenA += 1;
    }
    while (nodeB.next) {
        nodeB = nodeB.next;
        lenB += 1;
    }
    nodeA = headA;
    nodeB = headB;
    if (lenA > lenB) {
        let i = 0;
        while (i < lenA - lenB) {
            nodeA = nodeA.next as ListNode;
            i += 1;
        }
    } else {
        let i = 0;
        while (i < lenB - lenA) {
            nodeB = nodeB.next as ListNode;
            i += 1;
        }
    }
    while (nodeA !== nodeB) {
        if (!nodeA || !nodeB) {
            return null;
        }
        nodeA = nodeA.next as ListNode;
        nodeB = nodeB.next as ListNode;
    }
    return nodeA;
}