import { findWords, partition } from ".";

describe('hard => Backtracking', () => {
    test('Palindrome Partitioning', () => {
        expect(partition('aab')).toEqual(['a', 'a', 'b'])
    });
    test('Word Search II', () => {
        const borad = [
            ['o', 'a', 'a', 'n'],
            ['e', 't', 'a', 'e'],
            ['i', 'h', 'k', 'r'],
            ['i', 'f', 'l', 'v']
        ];
        const words = ["oath", "pea", "eat", "rain"];
        expect(findWords(borad, words)).toEqual(['eat', 'oath']);
    });
});
