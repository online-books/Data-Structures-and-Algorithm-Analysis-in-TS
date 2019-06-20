import {
    searchMatrix,
    sortColors,
} from './index';

describe('sorting and searching', () => {
    test('sort colors', () => {
        const input1 = [2, 0, 2, 1, 1, 0];
        sortColors(input1);
        expect(input1).toEqual([0, 0, 1, 1, 2, 2]);
        const input2 = [1, 2, 0];
        sortColors(input2);
        expect(input2).toEqual([0, 1, 2]);
    });
    test.skip('Search a 2D Matrix II', () => {
        const nums = [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
        ];
        expect(searchMatrix(nums, 5)).toBeTruthy();
        // expect(searchMatrix(nums, 20)).toBeFalsy();
        // expect(searchMatrix([], 0)).toBeFalsy();
        // expect(searchMatrix([[-1, 3]], -1)).toBeTruthy();
    })
});
