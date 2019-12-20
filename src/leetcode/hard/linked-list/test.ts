import {
    buildList
} from '../../../data-structures/linked-list/single-list'
import { getValuesFromList } from '../../../share/utils';

import {
    mergeKLists,
    sortList
} from './index';


describe('Hard => Linked List', () => {
    test('Merge k Sorted Lists', () => {
        const l1 = buildList([1, 4, 5]);
        const l2 = buildList([1, 3, 4]);
        const l3 = buildList([2, 6]);
        const list = mergeKLists([l1, l2, l3]);
        const values = getValuesFromList(list);
        expect(values).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
    });
    test('Sort List', () => {
        const l1 = buildList([4, 2, 1, 3]);
        const l2 = buildList([1, 2, 3, 4]);
        expect(sortList(l1)).toEqual(l2);
        const l3 = buildList([-1, 5, 3, 4, 0]);
        const l4 = buildList([-1, 0, 3, 4, 5]);
        expect(sortList(l3)).toEqual(l4);
    })
})