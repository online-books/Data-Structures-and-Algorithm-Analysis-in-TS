import DisjointSet from "../../data-structures/disjoint-set";

describe("不相交集", () => {
  const disSet = new DisjointSet(9);
  test("out of range", () => {
    expect(() => {
      disSet.find(9);
    }).toThrowError(new RangeError("out of range"));
  });
  test("base operation", () => {
    disSet.union(5, 6);
    expect(disSet.find(6)).toBe(5);
    disSet.union(7, 8);
    expect(disSet.find(8)).toBe(7);
    disSet.union(5, 7);
    expect(disSet.find(7)).toBe(5);
    disSet.union(4, 5);
    expect(disSet.find(4)).toBe(5);
    expect(disSet.find(8)).toBe(5);
  });
});
