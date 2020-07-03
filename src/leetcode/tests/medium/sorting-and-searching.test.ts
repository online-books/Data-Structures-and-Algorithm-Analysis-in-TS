import {
  findKthLargest,
  sortColors,
  topKFrequent,
} from "@src/leetcode/medium/sorting-and-searching";

describe("sorting and searching", () => {
  test("sort colors", () => {
    const input1 = [2, 0, 2, 1, 1, 0];
    sortColors(input1);
    expect(input1).toEqual([0, 0, 1, 1, 2, 2]);
    const input2 = [1, 2, 0];
    sortColors(input2);
    expect(input2).toEqual([0, 1, 2]);
  });
  test("Top K Frequent Elements", () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2]);
    expect(topKFrequent([1], 1)).toEqual([1]);
    expect(topKFrequent([1, 1, 1, 2, 2, 33333333], 2)).toEqual([1, 2]);
  });
  test("Kth Largest Element in an Array", () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargest([2, 1], 1)).toBe(2);
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    expect(findKthLargest([3, 3, 3, 3, 3, 3, 3, 3, 3], 7)).toBe(3);
    expect(findKthLargest([3, 1, 2, 4], 2)).toBe(3);
    expect(
      findKthLargest(
        [
          3,
          2,
          3,
          1,
          2,
          4,
          5,
          5,
          6,
          7,
          7,
          8,
          2,
          3,
          1,
          1,
          1,
          10,
          11,
          5,
          6,
          2,
          4,
          7,
          8,
          5,
          6,
        ],
        20
      )
    ).toBe(2);
  });
});
