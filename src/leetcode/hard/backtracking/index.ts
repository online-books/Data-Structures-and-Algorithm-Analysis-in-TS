import { isPalindrome } from '../../easy/string/index';

interface ITrieNode {
    charactor: string;
    word?: string;
    children: {
        [propName: string]: ITrieNode
    };
}

/**
 * Palindrome Partitioning
 * Given a string s, partition s such that every substring of the partition is a palindrome.
 * Return all possible palindrome partitioning of s.
 */

export function partition(s: string): string[][] {
    const {
        length
    } = s;
    const result: string[][] = [];
    function combine(arr: string[], start: number) {
        if (start === length) {
            result.push(arr);
        }
        for (let i = start + 1; i <= length; i++) {
            const str = s.slice(start, i);
            if (isPalindrome(str)) {
                combine(arr.concat(str), i);
            }
        }
    }
    if (length) {
        combine([], 0);
    }
    return result;
}


/**
 * Word Search II
 * Given a 2D board and a list of words from the dictionary, find all words in the board.
 * Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. 
 * The same letter cell may not be used more than once in a word.
 */

export function findWords(board: string[][], words: string[]): string[] {
    const row = board.length;
    if (!row) {
        return [];
    }
    const set: Set<string> = new Set();

    const column = board[0].length;
    const buildTrie = (): ITrieNode => {
        const root: ITrieNode = {
            charactor: '',
            children: {}
        };
        words.forEach(word => {
            let current = root.children;
            const {
                length
            } = word;
            for (let i = 0; i < length; i++) {
                const charactor = word[i];
                if (!(charactor in current)) {
                    current[charactor] = {
                        charactor,
                        children: {}
                    };
                }
                if (i === length - 1) {
                    current[charactor].word = word;
                }
                current = current[charactor].children;
            }
        });
        return root;
    }
    const trie = buildTrie();
    const dfs = (i: number, j: number, prefix: string, trieNode: ITrieNode): void => {
        if (i < 0 || j < 0 || i >= row || j >= column) {
            return;
        }
        const character = board[i][j];
        trieNode = trieNode.children[character];
        if (!trieNode) {
            return;
        }
        const word = prefix.concat(character);
        if (trieNode.word === word) {
            set.add(word);
        }
        board[i][j] = '#';
        dfs(i - 1, j, word, trieNode);
        dfs(i, j - 1, word, trieNode);
        dfs(i, j + 1, word, trieNode);
        dfs(i + 1, j, word, trieNode);
        board[i][j] = character;
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            dfs(i, j, '', trie);
        }
    }
    return Array.from(set);
}


/**
 * Remove Invalid Parentheses
 * Remove the minimum number of invalid parentheses in order to make the input string valid. 
 * Return all possible results.
 * Note: The input string may contain letters other than the parentheses ( and ).
 */

export function removeInvalidParentheses(s: string): string[] {
    const cache: string[] = [];
    const result: string[] = [];
    let openParenthese = '(';
    let closeParenthese = ')';
    let order = 0;
    const checkInvalidParentheses = (str: string, startIndex: number, lastRemovedIndex: number) => {
        const {
            length
        } = str;
        let stack = 0;
        for (let i = startIndex; i < length; i++) {
            const char = str[i];
            if (char === openParenthese) {
                stack += 1;
            }
            if (char === closeParenthese) {
                stack -= 1;
            }
            if (stack < 0) {
                for (let j = lastRemovedIndex; j <= i; ++j) {
                    if (str[j] === closeParenthese && str[j - 1] !== str[j]) {
                        checkInvalidParentheses(str.slice(0, j).concat(str.slice(j + 1)), i, j);
                    }
                }
                return;
            }
        }
        if (!order) {
            cache.push(str);
        } else {
            result.push(str.split('').reverse().join(''));
        }
    }
    checkInvalidParentheses(s, 0, 0);
    order = 1;
    [openParenthese, closeParenthese] = [closeParenthese, openParenthese];
    cache.forEach((str) => {
        checkInvalidParentheses(str.split('').reverse().join(''), 0, 0);
    });
    if (!result.length) {
        result.push('');
    }
    return result;
}

/**
 * Wildcard Matching
 * Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.
 * '?' Matches any single character.
 * '*' Matches any sequence of characters (including the empty sequence).
 * The matching should cover the entire input string (not partial).
 * s could be empty and contains only lowercase letters a-z.
 * p could be empty and contains only lowercase letters a-z, and characters like ? or *.
 */

export function isMatch(s: string, p: string): boolean {
    const {
        length: sLen,
    } = s;
    const {
        length: pLen,
    } = p;
    let i = 0;
    let j = 0;
    let match = i;
    let starIdx = -1;
    while (i < sLen) {
        const charS = s[i];
        const charP = p[j];
        if (j < pLen && (charS === charP || charP === '?')) {
            i++;
            j++;
        } else if (j < pLen && charP === '*') {
            starIdx = j;
            match = i;
            j++;
        } else if (starIdx !== -1) {
            j = starIdx + 1;
            match++;
            i = match;
        } else {
            return false;
        }
    }
    while (p[j] === '*') {
        j++;
    }
    return j === pLen;
}