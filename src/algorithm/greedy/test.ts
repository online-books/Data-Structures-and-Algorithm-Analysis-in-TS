import { huffmanCode } from "./index";

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
});
