import { compareFn } from '@/shared/util';

describe('util', () => {
    test('increase compare function', () => {
        const arr = [2, 1];
        arr.sort(compareFn(false));
        expect(arr).toEqual([1, 2])
    });
    test('decrease compare function', () => {
        const arr = [1, 2];
        arr.sort(compareFn());
        expect(arr).toEqual([2, 1])
    })
})