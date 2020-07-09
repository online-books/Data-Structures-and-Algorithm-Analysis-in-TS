import { swap, compare, swapChildNode, isOdd } from "@src/share/utils";

describe("utils", () => {
  test("swap", () => {
    const arr = [0, 1];
    swap(arr, 0, 1);
    const [a, b] = arr;
    expect(a).toBe(1);
    expect(b).toBe(0);
  });
  test("compare", () => {
    expect(compare(1, 2)).toBe(-1);
    expect(compare(2, 1)).toBe(1);
    expect(compare(2, 2)).toBe(-1);
  });
  test("swapChildNode", () => {
    const node = { left: 1, right: 2 };
    swapChildNode(node);
    expect(node.left).toBe(2);
    expect(node.right).toBe(1);
  });
  test("isOdd", () => {
    expect(isOdd(-1)).toBeFalsy();
    expect(isOdd(0.4)).toBeFalsy();
    expect(isOdd(-0.4)).toBeFalsy();
    expect(isOdd(1)).toBeTruthy();
    expect(isOdd(2)).toBeFalsy();
  });
});
