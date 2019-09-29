
/**
 * Lette Combinations of a Phone Number
 * @param digits 
 */
export function letterCombinations(digits: string): string[] {
    const mappings = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    };
    if (!digits || !digits.length) {
        return [];
    }
    if (digits.length === 1) {
        return mappings[digits];
    }
    const res1 = letterCombinations(digits.slice(0, 1));
    const res2 = letterCombinations(digits.slice(1));
    const result: string[] = [];
    for (let i = 0; i < res1.length; i++) {
        for (let j = 0; j < res2.length; j++) {
            result.push(res1[i] + res2[j]);
        }
    }
    return result;
}

/**
 * Generate Parentheses
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 * @param n 
 */

export function generateParenthesis(n: number): string[] {
    if (!n) {
        return [];
    }
    if (n === 1) {
        return ['()'];
    }
    const result = generateParenthesis(n - 1);
    const set: Set<string> = new Set();
    for (let i = 0; i < result.length; i++) {
        set.add('(' + result[i] + ')');
        set.add('()' + result[i]);
        set.add(result[i] + '()');
    }
    return Array.from(set);
}

/**
 * Permutations
 * Given a collection of distinct integers, return all possible permutations.
 * @param nums 
 */
export function permute(nums: number[]): number[][] {
    function recursion(index: number, arr: number[][]): number[][] {
        if (index === nums.length) {
            return arr;
        }
        let result: number[][] = [];
        if (index === 0) {
            result = [[nums[0]]];
        } else {
            arr.forEach(item => {
                for (let i = 0; i <= item.length; i++) {
                    const a = item.slice();
                    a.splice(i, 0, nums[index]);
                    result.push(a);
                }
            })
        }
        return recursion(index + 1, result);
    }
    return recursion(0, []);
}

/**
 * Subsets
 * Given a set of distinct integers, nums, return all possible subsets (the power set).
 * @param nums 
 */
export function subsets(nums: number[]): number[][] {
    const len = nums.length;
    function recursion(index: number, arr: number[][]): number[][] {
        if (index === len) {
            return arr;
        }
        const arrLen = arr.length;
        for (let i = 0; i < arrLen; i++) {
            const result = arr[i].slice();
            result.push(nums[index]);
            arr.push(result);
        }
        return recursion(index + 1, arr);
    }
    return recursion(0, [[]]);
}

/**
 * Word Search
 * Given a 2D board and a word, find if the word exists in the grid.
 * @param board 
 * @param word 
 */
export function exist(board: string[][], word: string): boolean {
    const rowNum = board.length;
    const columnNum = board[0].length;
    const wordLen = word.length;
    function recursion(index: number, row: number, column: number): boolean {
        if (index === wordLen) {
            return true;
        }
        if (row < 0 || row >= rowNum) {
            return false;
        }
        if (column < 0 || column >= columnNum) {
            return false;
        }
        if (board[row][column] !== word[index]) {
            return false;
        }
        board[row][column] = '*';
        const result = recursion(index + 1, row, column + 1) || recursion(index + 1, row, column - 1) || recursion(index + 1, row + 1, column) || recursion(index + 1, row - 1, column);
        board[row][column] = word[index];
        return result;

    }
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < columnNum; j++) {
            if (recursion(0, i, j)) {
                return true;
            }
        }
    }
    return false;
}