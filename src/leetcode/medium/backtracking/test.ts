import {
    exist,
    permute,
    subsets,
} from './index';

describe('backtracking', () => {
    test('Permutations', () => {
        const input = [
            1, 2, 3
        ];
        const expected = [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1]
        ];
        const result = permute(input);
        expect(result).toEqual(expected);
    });
    test('Subsets', () => {
        const input = [1, 2, 3];
        const output = subsets(input);
        console.log(output);
    });
    test.only('Word Search', () => {
        const board =
            [
                ['A', 'B', 'C', 'E'],
                ['S', 'F', 'C', 'S'],
                ['A', 'D', 'E', 'E']
            ];
        expect(exist(board, 'ABCCED')).toBeTruthy();
        // expect(exist(board, 'SEE')).toBeTruthy();
        // expect(exist(board, 'ABCB')).toBeFalsy();
    })
})