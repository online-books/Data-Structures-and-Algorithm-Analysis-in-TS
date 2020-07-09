import {
  huffmanCode,
  binPackingProblemWithFirstFit,
  binPackingProblemWithBestFit,
  binPackingProblemWithFirstFitDecreasing,
} from "../../algorithm/greedy";

describe("greedy", () => {
  test("huffman code", () => {
    const str = "a"
      .repeat(10)
      .concat("e".repeat(15))
      .concat("i".repeat(12))
      .concat("s".repeat(3))
      .concat("t".repeat(4));
    const node = huffmanCode(str);
    expect(node.val).toBe(44);
    expect(node.left!.val).toBe(17);
    expect(node.right!.val).toBe(27);
  });
  test("bin packing problem with first fit", () => {
    const goods = [2, 5, 4, 7, 1, 3, 8];
    const cap = 10;
    const cost = binPackingProblemWithFirstFit(goods, cap);
    expect(cost).toBe(4);
  });
  test("bin packing problem with best fit", () => {
    const goods = [2, 5, 4, 7, 1, 3, 8];
    const cap = 10;
    const cost = binPackingProblemWithBestFit(goods, cap);
    expect(cost).toBe(4);
  });
  test("bin packing problem with first fit decreasing", () => {
    const goods = [2, 5, 4, 7, 3, 8];
    const cap = 10;
    const cost = binPackingProblemWithFirstFitDecreasing(goods, cap);
    expect(cost).toBe(3);
  });
});
