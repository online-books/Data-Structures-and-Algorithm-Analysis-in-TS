import {
  balanceSymbol,
  postfixExpression,
  transformInFixExpressionToPostfixExpression,
} from "../stack";

describe("栈", () => {
  test("平衡符号", () => {
    expect(balanceSymbol("[a*(b+c)+d*(e+f)]")).toBeTruthy();
  });
  test("计算后缀表达式", () => {
    expect(postfixExpression("123*+45*+6-")).toBe(21);
  });
  test("中缀转后缀表达式", () => {
    const expression = transformInFixExpressionToPostfixExpression(
      "1+2*3+(4+5*6+7+8)*9"
    );
    expect(expression).toBe("123*+456*+78++9*+");
    expect(postfixExpression(expression)).toBe(448);
  });
});
