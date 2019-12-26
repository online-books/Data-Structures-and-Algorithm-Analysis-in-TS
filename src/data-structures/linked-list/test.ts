
import {
    addPolynomial,
    mutiplePolynomial,
    radixSort,
} from './index';
import ListNode from './list-node';
import SingleList from './single-list';


describe('链表', () => {
    const list = new SingleList();
    const arr = [1, 2, 3, 4, 5, 6];

    test('insert', () => {
        arr.forEach((value) => {
            list.insert(value);
        });
        expect(list.size).toEqual(arr.length);
        expect(list.lastNode).toEqual({
            val: 6,
            next: null,
        })
    });
    test('find', () => {
        const value = arr[arr.length - 1];
        const node = list.find(value);
        expect(node).toEqual(new ListNode(value));
    });
    test('delete', () => {
        list.delete(3);
        const prevNode = list.find(2);
        const nextNode = list.find(4);
        expect(prevNode.next).toBe(nextNode);
        list.delete(6);
        expect(list.lastNode).toEqual({
            val: 5,
            next: null,
        })
    });
});
describe('链表的应用', () => {
    const list1 = new SingleList();
    const list2 = new SingleList();
    const arr1 = [
        {
            power: 5,
            coeff: 10,
        },
        {
            power: 2,
            coeff: 3,
        }
    ];
    const arr2 = [
        {
            power: 3,
            coeff: 2,
        },
        {
            power: 1,
            coeff: 8,
        }
    ];
    arr1.forEach(value => list1.insert(value));
    arr2.forEach(value => list2.insert(value));
    test('add polynomial', () => {
        const list = addPolynomial(list1, list2);
        expect(list.lastNode.val).toMatchObject({
            power: 1,
            coeff: 8,
        });
    });
    test('multiple polynomial', () => {
        const list = mutiplePolynomial(list1, list2);
        let maxPower = 0;
        list.traverse((value: any) => {
            if (value.power > maxPower) {
                maxPower = value.power;
            }
        });
        expect(maxPower).toBe(8);
    });
    test('radix sort', () => {
        const test = [5, 34, 2, 74, 743, 132, 543, 7, 57, 543, 324, 6547, 74, 56, 45, 35, 23, 4];
        const result = radixSort(test);
        expect(result[0]).toBe(Math.min(...test));
    });
});