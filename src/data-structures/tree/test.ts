import AVLTree from "./avl-tree";
import BinarySearchTree from "./binary-search-tree";
import SplayTreeBottomToTop from "./splay-tree/splay-tree-bottom-to-top";
import SplayTreeTopToBottom from "./splay-tree/splay-tree-top-to-bottom";

import { generateExpressionTree } from "./index";

it("后缀表达式构造表达式树", () => {
  const expression = "12+345+**";
  const binaryTree = generateExpressionTree(expression);
  expect(binaryTree.val).toBe("*");
});
describe("二叉查找树", () => {
  const data = [8, 5, 12, 13, 15];
  const tree = new BinarySearchTree();
  data.forEach((value) => tree.insert(value));
  test("查找最大值", () => {
    const max = tree.findMax();
    expect(max).toBe(15);
  });
  test("查找最小值", () => {
    const min = tree.findMin();
    expect(min).toBe(5);
  });
  test("获取高度", () => {
    expect(tree.height).toBe(3);
    tree.insert(16);
    tree.insert(17);
    expect(tree.height).toBe(5);
  });
  test("删除元素", () => {
    tree.delete(15);
    tree.delete(5);
    expect(tree.find(8)!.left).toBe(null);
  });
});
describe("AVL树", () => {
  const tree = new AVLTree();
  const data = [3, 2, 11, 10, 8, 9];
  data.forEach((value) => tree.insert(value));
  test("构建", () => {
    const root = tree.root;
    expect(root!.val).toBe(8);
  });
  test("查找最小值", () => {
    expect(tree.findMin()).toBe(2);
  });
  test("查找最大值", () => {
    expect(tree.findMax()).toBe(11);
  });
  test("获取高度", () => {
    expect(tree.height).toBe(2);
  });
});

describe("伸展树", () => {
  test("自下向顶伸展树", () => {
    const data1 = [7, 6, 5, 4, 3, 2, 1];
    const tree1 = new SplayTreeBottomToTop();
    data1.forEach((value) => tree1.insert(value));
    expect(tree1.height).toBe(6);
    tree1.find(1);
    expect(tree1.root!.val).toBe(1);
    expect(tree1.height).toBe(4);
    tree1.find(2);
    expect(tree1.root!.val).toBe(2);
    expect(tree1.root!.left!.val).toBe(1);
    const data2 = [12, 5, 25, 20, 24, 30, 15, 13, 18, 16];
    const tree2 = new SplayTreeBottomToTop();
    data2.forEach((value) => tree2.insert(value));
    expect(tree2.height).toBe(5);
    tree2.find(19);
    expect(tree2.root!.val).toBe(18);
    expect(tree2.height).toBe(3);
    tree2.find(12);
    expect(tree2.root!.val).toBe(12);
  });
  test("自顶向下伸展树", () => {
    const data1 = [7, 6, 5, 4, 3, 2, 1];
    const tree1 = new SplayTreeTopToBottom();
    data1.forEach((value) => tree1.insert(value));
    expect(tree1.height).toBe(6);
    tree1.find(1);
    expect(tree1.root!.val).toBe(1);
    expect(tree1.height).toBe(4);
    tree1.find(2);
    expect(tree1.root!.val).toBe(2);
    expect(tree1.root!.left!.val).toBe(1);
    const data2 = [12, 5, 25, 20, 24, 30, 15, 13, 18, 16];
    const tree2 = new SplayTreeTopToBottom();
    data2.forEach((value) => tree2.insert(value));
    expect(tree2.height).toBe(5);
    tree2.find(19);
    expect(tree2.root!.val).toBe(18);
    expect(tree2.height).toBe(3);
    expect(tree2.root!.left!.val).toBe(12);
    expect(tree2.root!.right!.right!.val).toBe(25);
    expect(tree2.root!.left!.right!.val).toBe(15);
  });
});
