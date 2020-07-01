import AVLTree from "./avl-tree/avl-tree";
import BinarySearchTree from "./binary-search-tree/binary-search-tree";
import SplayTreeBottomToTop from "./splay-tree/splay-tree-bottom-to-top";
import SplayTreeTopToBottom from "./splay-tree/splay-tree-top-to-bottom";
import RedBlackTree from "./red-black-tree/red-black-tree";
// import RedBlackTreeNode from "./red-black-tree/red-black-tree-node";

import { generateExpressionTree } from "./index";
import RedBlackTreeNode from "./red-black-tree/red-black-tree-node";

describe("树", () => {
  test("后缀表达式构造表达式树", () => {
    const expression = "12+345+**";
    const binaryTree = generateExpressionTree(expression);
    expect(binaryTree.val).toBe("*");
  });

  test("二叉查找树", () => {
    const data = [8, 5, 12, 13, 15];
    const tree = new BinarySearchTree();
    data.forEach((value) => tree.insert(value));
    const max = tree.findMax();
    expect(max).toBe(15);
    const min = tree.findMin();
    expect(min).toBe(5);
    expect(tree.height).toBe(3);
    tree.insert(16);
    tree.insert(17);
    expect(tree.height).toBe(5);
    tree.delete(15);
    tree.delete(5);
    expect(tree.find(8)!.left).toBe(null);
  });

  test("AVL树", () => {
    const tree = new AVLTree();
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);
    expect(tree.root!.val).toBe(2);
    expect(tree.root!.left!.val).toBe(1);
    expect(tree.root!.right!.val).toBe(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.root!.val).toBe(2);
    expect(tree.root!.right!.val).toBe(4);
    expect(tree.root!.left!.val).toBe(1);
    tree.insert(6);
    expect(tree.root!.val).toBe(4);
    expect(tree.root!.left!.val).toBe(2);
    expect(tree.root!.right!.val).toBe(5);
    tree.insert(7);
    tree.insert(16);
    tree.insert(15);
    expect(tree.root!.right!.right!.val).toBe(15);
    expect(tree.root!.right!.right!.left!.val).toBe(7);
    expect(tree.root!.right!.right!.right!.val).toBe(16);
    expect(tree.find(4)!.height).toBe(3);
    expect(tree.find(2)!.height).toBe(1);
    expect(tree.find(1)!.height).toBe(0);
    expect(tree.find(3)!.height).toBe(0);
    expect(tree.find(6)!.height).toBe(2);
    expect(tree.find(5)!.height).toBe(0);
    expect(tree.find(15)!.height).toBe(1);
    expect(tree.find(7)!.height).toBe(0);
    expect(tree.find(16)!.height).toBe(0);
  });

  test("自底向上伸展树", () => {
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
  test("红黑树", () => {
    const redBlackTree = new RedBlackTree();
    [30, 15, 10, 20, 5, 60, 50, 70, 65, 85, 40, 55, 45, 80, 90].forEach((val) =>
      redBlackTree.insert(val)
    );
    expect(redBlackTree.find(30)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(15)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(10)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(20)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(5)!.colorType).toBe(RedBlackTreeNode.RED);
    expect(redBlackTree.find(60)!.colorType).toBe(RedBlackTreeNode.RED);
    expect(redBlackTree.find(50)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(70)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(40)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(55)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(65)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(85)!.colorType).toBe(RedBlackTreeNode.BLACK);
    expect(redBlackTree.find(45)!.colorType).toBe(RedBlackTreeNode.RED);
    expect(redBlackTree.find(80)!.colorType).toBe(RedBlackTreeNode.RED);
    expect(redBlackTree.find(90)!.colorType).toBe(RedBlackTreeNode.RED);
  });
});
