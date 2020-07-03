import {
  intersect,
  isValidSudoku,
  rotateImage1,
  rotateImage2,
  singleNumber,
  twoSum,
  containsDuplicate,
  moveZeroes,
  plusOne,
  rotate,
  maxProfit,
  removeDuplicates,
} from "@src/leetcode/easy/array";

describe("easy => array", () => {
  test("removeDuplicates", () => {
    expect(removeDuplicates([1, 1, 2])).toBe(2);
    expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toBe(5);
  });
  test("maxProfit", () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(7);
    expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
  test("rotate", () => {
    expect(rotate([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([5, 6, 7, 1, 2, 3, 4]);
    expect(rotate([-1, -100, 3, 99], 2)).toEqual([3, 99, -1, -100]);
  });
  test("intersect", () => {
    const a1 = [1];
    const a2 = [2];
    expect(intersect(a1, a2)).toEqual([]);
    a1.push(2);
    a2.push(1);
    expect(intersect(a1, a2)).toEqual(a1);
  });
  test("singleNumber", () => {
    expect(singleNumber([1, 2, 3, 4, 3, 2, 1])).toBe(4);
    expect(singleNumber([1, 2, 3, 3, 2, 1])).toBe(0);
  });
  test("two sum", () => {
    const numbers = [3, 5, 2, 7, 4, -4, -2, -6, -5, 1, 8];
    expect(twoSum(numbers, 3)).toEqual([
      [7, -4],
      [5, -2],
      [2, 1],
      [-5, 8],
    ]);
  });
  test("containsDuplicate", () => {
    expect(containsDuplicate([1])).toBeFalsy();
    expect(containsDuplicate([1, 2, 1])).toBeTruthy();
    expect(containsDuplicate([])).toBeFalsy();
  });
  test("plusOne", () => {
    expect(plusOne([1, 1])).toEqual([1, 2]);
    expect(plusOne([1, 9])).toEqual([2, 0]);
    expect(plusOne([1, 9, 9])).toEqual([2, 0, 0]);
    expect(plusOne([1, 9, 9])).toEqual([2, 0, 0]);
  });
  test("moveZeroes", () => {
    expect(moveZeroes([0, 1, 4, 0, 2, 3])).toEqual([1, 4, 2, 3, 0, 0]);
    expect(moveZeroes([1, 0])).toEqual([1, 0]);
  });
  test("rotateImage", () => {
    function getInput() {
      return [
        [5, 1, 9, 11],
        [2, 4, 8, 10],
        [13, 3, 6, 7],
        [15, 14, 12, 16],
      ];
    }
    const expected = [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ];
    const result1 = rotateImage1(getInput());
    const result2 = rotateImage2(getInput());
    expect(result1).toEqual(expected);
    expect(result1).toEqual(result2);
  });
  test("isValidSudoku", () => {
    const input = [
      ["8", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ];
    expect(isValidSudoku(input)).toBeFalsy();
  });
});
