import Stack from '@/stack/Stack';

describe('Stack', () => {
    let stack: Stack<number>
    test('stack initialize', () => {
        stack = new Stack<number>()
        expect(stack).toBeInstanceOf(Stack)
        expect(stack.size).toBe(0);
        expect(stack.topElement).toBeNull();
    });
    test('stack push', () => {
        stack.push(1);
        expect(stack.size).toBe(1)
        expect(stack.topElement).toBe(1);
        stack.push(2);
        expect(stack.topElement).toBe(2);
        expect(stack.size).toBe(2);
    });
    test('stack pop', () => {
        const value = stack.pop();
        expect(value).toBe(2);
        expect(stack.topElement).toBe(1);
    })
})