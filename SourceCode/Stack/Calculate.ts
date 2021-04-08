/** @format */

import Stack from './Stack'

const ADD = '+'
const MINUS = '-'
const MUL = '*'
const DIV = '/'
const LEFT_BRACKET = '('
const RIGHT_BRACKET = ')'

const OPERATORS = {
    [ADD]: 1,
    [MINUS]: 1,
    [MUL]: 2,
    [DIV]: 2,
}

export default function calculate(expression: string): number {
    const data = infix2Postfix(expression)
    const stack = new Stack<string>()
    for (let i = 0, l = data.length; i < l; i++) {
        const n = data[i]
        if (Reflect.has(OPERATORS, n)) {
            const v1 = Number(stack.pop())
            const v2 = Number(stack.pop())
            let r: number
            if (n === ADD) {
                r = v1 + v2
            } else if (n === MINUS) {
                r = v2 - v1
            } else if (n === MUL) {
                r = v1 * v2
            } else {
                r = v2 / v1
            }
            stack.push(String(r))
        } else {
            stack.push(n)
        }
    }
    return Number(stack.top)
}

export function infix2Postfix(expression: string): string[] {
    const l = expression.length
    if (!l) {
    }
    const stack = new Stack<string>()
    const result: string[] = []
    let i = 0
    let n = ''
    while (i < l) {
        const char = expression[i]
        if (Reflect.has(OPERATORS, char)) {
            if (n) {
                result.push(n)
                n = ''
            }
            const weight = Reflect.get(OPERATORS, char)
            while (!stack.isEmpty() && weight <= Reflect.get(OPERATORS, stack.top!)) {
                result.push(stack.pop())
            }
            stack.push(char)
        } else if (char === LEFT_BRACKET) {
            stack.push(char)
        } else if (char === RIGHT_BRACKET) {
            result.push(n)
            n = ''
            while (!stack.isEmpty() && stack.top !== LEFT_BRACKET) {
                result.push(stack.pop())
            }
            stack.pop()
        } else {
            n = n.concat(char)
        }
        i++
    }
    if (n) {
        result.push(n)
    }
    while (!stack.isEmpty()) {
        result.push(stack.pop())
    }
    return result
}
