import {
    exist,
    generateParenthesis,
    letterCombinations,
    permute,
    subsets,
} from './index';

describe('medium => backtracking', () => {
    test('Lette Combinations of a Phone Number', () => {
        expect(letterCombinations('23')).toEqual(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"])
    });
    test('Generate Parentheses', () => {
        expect(generateParenthesis(3)).toEqual(["((()))", "(()())", "(())()", "()(())", "()()()"])
    })
    test('Permutations', () => {
        const input = [
            1, 2, 3
        ];
        const expected = [[3, 2, 1], [2, 3, 1], [2, 1, 3], [3, 1, 2], [1, 3, 2], [1, 2, 3]];
        const result = permute(input);
        expect(result).toEqual(expected);
    });
    test('Subsets', () => {
        const input = [1, 2, 3];
        const output = subsets(input);
        expect(output).toEqual([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
    });
    test('Word Search', () => {
        const board =
            [
                ['A', 'B', 'C', 'E'],
                ['S', 'F', 'C', 'S'],
                ['A', 'D', 'E', 'E']
            ];
        const board2 = [["A", "B", "C", "E"], ["S", "F", "E", "S"], ["A", "D", "E", "E"]];
        // expect(exist(board, 'ABCCED')).toBeTruthy();
        // expect(exist(board, 'SEE')).toBeTruthy();
        // expect(exist(board, 'ABCB')).toBeFalsy();
        expect(exist(board2, 'ABCESEEEFS')).toBeTruthy();
    });
})