import { huffmanCode } from "./index";

describe("greedy", () => {
  test("huffman code", () => {
    const str = "a"
      .repeat(10)
      .concat("b".repeat(15))
      .concat("c".repeat(12))
      .concat("d".repeat(5))
      .concat("e".repeat(4))
      .concat(" ")
      .concat(",".repeat(20));
    const tree = huffmanCode(str);
    console.log(tree);
  });
});
