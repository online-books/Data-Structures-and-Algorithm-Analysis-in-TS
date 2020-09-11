import LinkedList from "../../data-structures/list/linked-list/linked-list";
import SkipList from "../../data-structures/list/skip-list/skip-list";

describe("链表", () => {
  test("单向链表", () => {
    const list = new LinkedList();
    list.insert(6);
    expect(list.size).toBe(1);
    expect(list.lastNode).toEqual(list.firstNode);
    const n1 = list.insert(4);
    const n2 = list.insert(3);
    const n3 = list.insert(2, n1);
    expect(n1.next).toBe(n3);
    expect(n3.next).toBe(n2);
    list.insert(5);
    list.insert(1);
    list.delete(1);
    expect(list.lastNode).toBe(list.find(5));
    expect(list.delete(7)).toBeNull();
    list.delete(6);
    expect(list.find(4)).toEqual(list.firstNode);
  });
  test("确定性跳跃表", () => {
    const skipList = new SkipList();
    expect(skipList.height).toBe(1);
    skipList.insert(10);
    expect(skipList.height).toBe(2);
    expect(skipList.find(10)!.right.val).toBe(Number.POSITIVE_INFINITY);
    skipList.insert(14);
    expect(skipList.height).toBe(2);
    expect(skipList.find(10)!.right.val).toBe(14);
    expect(skipList.find(14)!.right.val).toBe(Number.POSITIVE_INFINITY);
    skipList.insert(20);
    expect(skipList.height).toBe(2);
    expect(skipList.find(14)!.right.val).toBe(20);
    skipList.insert(25);
    expect(skipList.height).toBe(3);
    expect(skipList.find(14)!.down.val).toBe(10);
    expect(skipList.find(25)!.right.val).toBe(Number.POSITIVE_INFINITY);
    expect(skipList.find(20)!.right.val).toBe(25);
    expect(skipList.find(11)).toBeNull();
  });
});
