import {
  balanceSymbol,
  postfixExpression,
  transformInFixExpressionToPostfixExpression,
} from "./stack";

describe("栈", () => {
  test("平衡符号", () => {
    const str = "[a*(b+c)+d*(e+f)]";
    const result = balanceSymbol(str);
    expect(result).toBeTruthy();
  });
  test("计算后缀表达式", () => {
    const expression = "123*+45*+6-";
    const result = postfixExpression(expression);
    expect(result).toBe(21);
  });
  test("中缀转后缀表达式", () => {
    const expression = "1+2*3+(4+5*6+7+8)*9";
    const result = transformInFixExpressionToPostfixExpression(expression);
    expect(result).toBe("123*+456*+78++9*+");
    expect(postfixExpression(result)).toBe(448);
  });
});
