
import {
    addPolynomial,
    mutiplePolynomial,
    radixSort,
} from './index';
import List from './list';
import Node from './node';


describe('链表的操作', () => {
    const list = new List();
    const arr = [1, 2, 3, 4, 5, 6];

    test('insert', () => {
        arr.forEach((value) => {
            list.insert(value);
        });
        expect(list.size).toEqual(arr.length);
        expect(list.last()).toEqual({
            value: 6,
            next: null,
        })
    });
    test('find', () => {
        const value = arr[arr.length - 1];
        const node = list.find(value);
        expect(node).toEqual(new Node(value));
    });
    test('delete', () => {
        list.delete(3);
        const prevNode = list.find(2) as Node;
        const nextNode = list.find(4) as Node;
        expect(prevNode.next).toBe(nextNode);
        list.delete(6);
        expect(list.last()).toEqual({
            value: 5,
            next: null,
        })
    });
});
describe('链表的应用', () => {
    const list1 = new List();
    const list2 = new List();
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
        expect(list.last().value).toMatchObject({
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