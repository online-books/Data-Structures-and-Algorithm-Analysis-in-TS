import {
    containsDuplicate,
    isValidSudoku,
    maxProfit,
    plusOne,
    removeDuplicates,
    rotate,
    rotateImage,
    singleNumber,
} from './index';

describe('arry', () => {
    test('Remove Duplicates from Sorted Array', () => {
        const data = [1, 1, 2];
        const len = removeDuplicates(data);
        expect(len).toBe(2);
    });
    test('Best Time to Buy and Sell Stock II', () => {
        expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(7);
        expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
    });
    test(' Rotate Array', () => {
        const data = [1, 2, 3, 4, 5, 6, 7];
        rotate(data, 3);
        expect(data).toEqual([5, 6, 7, 1, 2, 3, 4])
    });
    test('Contains Duplicate', () => {
        expect(containsDuplicate([3, 3])).toBeTruthy();
    });
    test('Single Number', () => {
        expect(singleNumber([4, 1, 2, 3, 4])).toBe(4);
    });
    test('Plus One', () => {
        expect(plusOne([6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3])).toEqual([6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 4])
    });
    test('rotateImage', () => {
        const data = [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16]
        ];
        rotateImage(data);
        expect(data).toEqual([
            [15, 13, 2, 5],
            [14, 3, 4, 1],
            [12, 6, 8, 9],
            [16, 7, 10, 11]
        ])
    });
    test.only('Valid Sudoku', () => {
        const data = [
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."]
        ];
        expect(isValidSudoku(data)).toBeTruthy();
    })
});