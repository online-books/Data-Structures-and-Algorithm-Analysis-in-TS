/**
 * Lette Combinations of a Phone Number
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
 */
export function letterCombinations(digits: string): string[] {
    const letters = ['', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const result: string[] = [];
    function combine(str: string, index: number): void {
        if (index === digits.length) {
            result.push(str);
            return;
        }
        const letter = letters[Number(digits[index]) - 1];
        for (let i = 0; i < letter.length; i++) {
            combine(str.concat(letter[i]), index + 1);
        }
    }
    if (digits.length) {
        combine('', 0);
    }
    return result;
}

/**
 * Generate Parentheses
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 */

export function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    const max = n * 2;
    function combine(parentheses: string, open: number, close: number): void {
        if (parentheses.length === max) {
            result.push(parentheses);
            return;
        }
        if (open < n) {
            combine(parentheses.concat('('), open + 1, close);
        }
        if (close < open) {
            combine(parentheses.concat(')'), open, close + 1);
        }
    }
    if (n) {
        combine('', 0, 0);
    }
    return result;
}

/**
 * Permutations
 * Given a collection of distinct integers, return all possible permutations.
 */
export function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const {
        length
    } = nums;
    function combine(arr: number[], index: number): void {
        if (index === length) {
            result.push(arr);
            return;
        }
        for (let i = 0; i <= arr.length; i++) {
            const copy = arr.slice();
            copy.splice(i, 0, nums[index])
            combine(copy, index + 1);
        }
    }
    combine([], 0);
    return result;
}

/**
 * Subsets
 * Given a set of distinct integers, nums, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets.
 */
export function subsets(nums: number[]): number[][] {
    const {
        length
    } = nums;
    const result: number[][] = [[]];
    function combine(index: number): void {
        if (index === length) {
            return;
        }
        const arrLen = result.length;
        for (let i = 0; i < arrLen; i++) {
            result.push(result[i].concat(nums[index]));
        }
        combine(index + 1);
    }
    if (!length) {
        return [];
    }
    combine(0);
    return result;
}

/**
 * Word Search
 * Given a 2D board and a word, find if the word exists in the grid.
 * The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. 
 * The same letter cell may not be used more than once.
 */
export function exist(board: string[][], word: string): boolean {
    const row = board.length;
    if (!row) {
        return false;
    }
    const column = board[0].length;
    const {
        length,
    } = word;
    function helper(i: number, j: number, index: number): boolean {
        if (index === length) {
            return true;
        }
        if (i < 0 || j < 0 || i >= row || j >= column || word[index] !== board[i][j]) {
            return false;
        }
        board[i][j] = '*';
        const result = helper(i + 1, j, index + 1) || helper(i, j + 1, index + 1) || helper(i - 1, j, index + 1) || helper(i, j - 1, index + 1);
        board[i][j] = word[index];
        return result;
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (helper(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
}