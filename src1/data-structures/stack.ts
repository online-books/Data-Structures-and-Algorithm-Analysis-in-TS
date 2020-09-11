/**
 * 栈是限制插入和删除只能在一个位置上进行的表，又叫先入后出(LIFO)表。
 * 队列是插入在一端而删除在另一端的表。
 */


// 判断平衡符号
export function balanceSymbol(str: string): Boolean {
    const inputReg = /[{([]/;
    const outputReg = /[}\])]/;
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const value = str[i];
        if (inputReg.test(value)) {
            stack.unshift(value);
        } else {
            const result = outputReg.exec(value);
            if (result) {
                const { input } = result;
                const first = stack[0];
                if (input === ']') {
                    if (first !== '[') {
                        return false;
                    }
                }
                if (input === ')') {
                    if (first !== '(') {
                        return false;
                    }
                }
                if (input === '}') {
                    if (first !== '{') {
                        return false;
                    }
                }
                stack.shift();
            }
        }
    }
    if (stack.length) {
        return false;
    }
    return true;
}

// 计算后缀表达式
export function postfixExpression(expression: string): number {
    const numbers: number[] = [];
    const reg = /[*+-\/]/;
    for (let i = 0; i < expression.length; i++) {
        const value = expression[i];
        if (reg.test(value)) {
            if (numbers.length < 2) {
                throw Error('表达式错误');
            }
            const n1 = numbers.shift() as number;
            const n2 = numbers.shift() as number;
            switch (value) {
                case '+': {
                    numbers.unshift(n2 + n1);
                    break;
                }
                case '-': {
                    numbers.unshift(n2 - n1);
                    break;
                }
                case '*': {
                    numbers.unshift(n2 * n1);
                    break;
                }
                case '/': {
                    numbers.unshift(n2 / n1);
                    break;
                }
            }

        } else {
            numbers.unshift(Number(value));
        }
    }
    return numbers[0];
}

// 中缀表达式转换为后缀表达式
export function transformInFixExpressionToPostfixExpression(expression: string): string {
    const numberReg = /[\d]/;
    const highReg = /[*\/]/;
    const lowReg = /[-+]/;
    const operatorStack: string[] = [];
    let result = '';
    for (let i = 0; i < expression.length; i++) {
        const value = expression[i];

        if (numberReg.test(value)) {
            result += value;
        } else {
            if (value === ')') {
                while (operatorStack.length) {
                    const operator = operatorStack.shift();
                    if (operator === '(') {
                        break;
                    } else {
                        result += operator;
                    }
                }
            } else {
                if (lowReg.test(value)) {
                    if (highReg.test(operatorStack[0])) {
                        while (operatorStack[0] !== '(' && operatorStack.length) {
                            result += operatorStack.shift();
                        }
                    }
                }
                operatorStack.unshift(value);
            }

        }
    }
    while (operatorStack.length) {
        result += operatorStack.shift();
    }
    return result;

}