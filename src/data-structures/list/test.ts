import ListNode from "./linked-list/list-node";
import SingleList from "./linked-list/single-list";

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
});
