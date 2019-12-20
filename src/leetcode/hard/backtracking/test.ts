import { findWords, isMatch, partition, removeInvalidParentheses } from '.';

describe('Hard => Backtracking', () => {
    test('Palindrome Partitioning', () => {
        expect(partition('aab')).toEqual(
            [
                ['a', 'a', 'b'],
                ['aa', 'b']
            ]
        );
        expect(partition('aabb')).toEqual(
            [
                ['a', 'a', 'b', 'b'],
                ['a', 'a', 'bb'],
                ['aa', 'b', 'b'],
                ['aa', 'bb'],
            ]
        );
    });
    test('Word Search II', () => {
        const borad = [
            ['o', 'a', 'a', 'n'],
            ['e', 't', 'a', 'e'],
            ['i', 'h', 'k', 'r'],
            ['i', 'f', 'l', 'v']
        ];
        const words = ['oath', 'pea', 'eat', 'rain'];
        expect(findWords(borad, words)).toEqual(['oath', 'eat',]);
        const borad1 = [
            ["a", "b"],
            ["c", "d"]
        ];
        const words1 = ["abcd"];
        expect(findWords(borad1, words1)).toEqual([]);
        const borad2 = [["a", "b"], ["c", "d"]];
        const words2 = ["ab", "cb", "ad", "bd", "ac", "ca", "da", "bc", "db", "adcb", "dabc", "abb", "acb"];
        expect(findWords(borad2, words2)).toEqual(["ab", "ac", "bd", "ca", "db"]);
        const borad3 = [["a", "b"], ["a", "a"]];
        const words3 = ["aba", "baa", "bab", "aaab", "aaa", "aaaa", "aaba"];
        expect(findWords(borad3, words3)).toEqual(
            ["aba", "aaa", "aaab", "baa", "aaba"]
        )
    });
    test('Remove Invalid Parentheses', () => {
        expect(removeInvalidParentheses('()()))()')).toEqual(['(())()', '()()()']);
        expect(removeInvalidParentheses('()(()()')).toEqual(['()(())', '()()()']);
        expect(removeInvalidParentheses('(a)())()')).toEqual(['(a())()', '(a)()()']);
        expect(removeInvalidParentheses(')(')).toEqual(['']);
        expect(removeInvalidParentheses("x(")).toEqual(["x"]);
        expect(removeInvalidParentheses("(((k()((")).toEqual(["(k)", "k()"]);
    });
    test('Wildcard Matching', () => {
        expect(isMatch('aa', 'a')).toBeFalsy();
        expect(isMatch('aa', '*')).toBeTruthy();
        expect(isMatch('cb', '?a')).toBeFalsy();
        expect(isMatch('adceb', '*a*b')).toBeTruthy();
        expect(isMatch('acdcb', 'a*c?b')).toBeFalsy();
        expect(isMatch('a', 'aa')).toBeFalsy();
        expect(isMatch('abefcdgiescdefimdefg', 'ab*cd?i*defg')).toBeTruthy();
        expect(isMatch('aaaa', '***a')).toBeTruthy();
        expect(isMatch('c', '*?*')).toBeTruthy();
        expect(isMatch('bbbababbbbabbbbababbaaabbaababbbaabbbaaaabbbaaaabb', '*b********bb*b*bbbbb*ba')).toBeFalsy();
    });
});