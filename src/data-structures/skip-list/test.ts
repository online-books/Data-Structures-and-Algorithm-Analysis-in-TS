import SkipList from "./index";

describe("Skip List", () => {
  const skipList = new SkipList();
  skipList.insert(1, "a");
  skipList.insert(2, "b");
  skipList.insert(3, "c");
  skipList.insert(4, "d");
  test("search value", () => {
    expect(skipList.find(1)).toBe("a");
    expect(skipList.find(2)).toBe("b");
    expect(skipList.find(3)).toBe("c");
    expect(skipList.find(4)).toBe("d");
  });
  test("insert overrides existing value", () => {
    skipList.insert(4, "e");
    expect(skipList.find(4)).toBe("e");
  });
  test("delete item", () => {
    skipList.delete(4);
    expect(skipList.find(4)).toBeNull();
  });
});
