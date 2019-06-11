import {
    addTwoNumbers,
    ListNode,
    oddEvenList,
} from './index';

describe.skip('Linked List', () => {
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
    test.only('Odd Even Linked List', () => {
        const nums = [1,2,3,4];
        let node!: ListNode;
        let head!: ListNode;
        nums.forEach(num => {
            if (!head) {
                head = new ListNode(num);
                node = head;
            } else {
                node.next = new ListNode(num);
                node = node.next;
            }
        });
        oddEvenList(head);
        while (head) {
            head = head.next as ListNode;
        }
    });
})