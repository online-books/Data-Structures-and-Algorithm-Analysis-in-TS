import { compareFn, generateRandomKeys } from '@/shared/util';

describe('util', () => {
    test('increase compare function', () => {
        const a = [2, 1];
        const b = [1, 2];
        a.sort(compareFn(false));
        b.sort(compareFn(false))
        expect(a).toEqual([1, 2])
        expect(b).toEqual([1, 2])
    });
    test('decrease compare function', () => {
        const a = [1, 2];
        const b = [2, 1];
        a.sort(compareFn());
        b.sort(compareFn());
        expect(a).toEqual([2, 1]);
        expect(b).toEqual([2, 1]);

    });
    test('generate random keys', () => {
        const characters = 'abcdefg';
        expect(() => {
            generateRandomKeys(characters, 8, 5)
        }).toThrow(Error)
        const keys = generateRandomKeys(characters, 2, 14);
        expect(keys.every(key => key.length === 2)).toBeTruthy()
        expect(keys.length).toBe(14)
    })
})