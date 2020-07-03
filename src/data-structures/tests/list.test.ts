import ListNode from "../list/linked-list/list-node";
import SingleList from "../list/linked-list/single-list";
import SkipList from "../list/skip-list/skip-list";

describe("链表", () => {
  test("单向链表", () => {
    const list = new SingleList();
    const arr = [1, 2, 3, 4, 5, 6];
    arr.forEach((value) => {
      list.insert(value);
    });
    expect(list.size).toEqual(arr.length);
    expect(list.lastNode).toEqual({
      val: 6,
      next: null,
    });
    const value = arr[arr.length - 1];
    const node = list.find(value);
    expect(node).toEqual(new ListNode(value));
    list.delete(3);
    const prevNode = list.find(2);
    const nextNode = list.find(4);
    expect(prevNode!.next).toBe(nextNode);
    list.delete(6);
    expect(list.lastNode).toEqual({
      val: 5,
      next: null,
    });
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
