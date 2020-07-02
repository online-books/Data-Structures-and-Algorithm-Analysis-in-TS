import {
  calculate,
  fib,
  Matrix,
  optMatrixMul,
  optBinarySearchTree,
} from "../dynamic-programming";

function createMatix(rowNum: number, columnNum: number, value = 1): Matrix {
  return new Array(rowNum).fill(new Array(columnNum).fill(value));
}

describe("dynamic programming", () => {
  test("fibonacci", () => {
    expect(fib(0)).toBe(1);
    expect(fib(1)).toBe(2);
    expect(fib(2)).toBe(3);
    expect(fib(3)).toBe(5);
    expect(fib(4)).toBe(8);
    expect(fib(5)).toBe(13);
  });
  test("calculate", () => {
    expect(calculate(0)).toBe(1);
    expect(calculate(1)).toBe(3);
    expect(calculate(2)).toBe(6);
    expect(calculate(3).toFixed(2)).toBe(Number(29 / 3).toFixed(2));
  });
  test("optMatrixMul", () => {
    const matrixA = createMatix(50, 10);
    const matrixB = createMatix(10, 40);
    const matrixC = createMatix(40, 30);
    const matrixD = createMatix(30, 5);
    expect(optMatrixMul(matrixA)).toEqual(0);
    expect(optMatrixMul(matrixA, matrixB)).toEqual(50 * 10 * 40);
    expect(optMatrixMul(matrixA, matrixB, matrixC)).toEqual(
      10 * 40 * 30 + 50 * 10 * 30
    );
    expect(optMatrixMul(matrixA, matrixB, matrixC, matrixD)).toEqual(10500); // A(B(CD))
  });
  test("optBinarySearchTree", () => {
    const data = [
      { word: "a", prob: 0.22 },
      { word: "am", prob: 0.18 },
      { word: "and", prob: 0.2 },
      { word: "egg", prob: 0.05 },
      { word: "if", prob: 0.25 },
      { word: "the", prob: 0.02 },
      { word: "two", prob: 0.08 },
    ];
    const { cost, tree } = optBinarySearchTree(data);
    expect(cost.toFixed(2)).toBe("2.15");
    expect(tree!.val).toBe("and");
  });
});
