import BinaryHeap from "../priority-queue/binary-heap";
import LeftistHeap from "../priority-queue/leftist-heap/leftist-heap";
import LeftistHeapNode from "../priority-queue/leftist-heap/leftist-heap-node";
import SkewHeap from "../priority-queue/skew-heap";
import BinomialQueue from "../priority-queue/binomal-queue/binomial-queue";

describe("二叉堆", () => {
  const data = [15, 17, 13, 9, 16, 14, 10].map((value) => ({ value }));
  const binaryHeap = BinaryHeap.create(data);
  test("构建", () => {
    expect(binaryHeap.isEmpty()).toBeFalsy();
  });
  test("获取最小值", () => {
    expect(binaryHeap.findMin()).toStrictEqual({ value: 9 });
  });
  test("删除最小值", () => {
    binaryHeap.deleteMin();
    expect(binaryHeap.findMin()).toStrictEqual({ value: 10 });
  });
  test("插入", () => {
    binaryHeap.insert({ value: 1 });
    expect(binaryHeap.findMin()).toStrictEqual({ value: 1 });
  });
});

describe("左式堆", () => {
  const heap = new LeftistHeap();
  test("插入", () => {
    const data = [10, 8, 3, 21, 14, 17];
    data.forEach((val) => heap.insert(val));
    const root = heap.root;
    expect(root).toBeInstanceOf(LeftistHeapNode);
    expect(root!.npl).toBe(1);
    expect(root!.val).toBe(3);
  });
  test("删除最小值", () => {
    heap.deleteMin();
    const root = heap.root;
    expect(root!.val).toBe(8);
  });
  test("合并", () => {
    const heap1 = new LeftistHeap();
    const heap2 = new LeftistHeap();
    const data = [6, 12, 18, 24];
    data.forEach((val) => heap1.insert(val));
    heap.merge(heap1);
    heap2.merge(heap1);
    expect(heap.root!.val).toBe(6);
    expect(heap2.root!.val).toBe(6);
  });
});

describe("斜堆", () => {
  const skewHeap = new SkewHeap();
  test("插入", () => {
    const data = [6, 3, 9, 10, 13];
    data.forEach((val) => skewHeap.insert(val));
    expect(skewHeap.root!.val).toBe(3);
  });
  test("删除最小元", () => {
    skewHeap.deleteMin();
    expect(skewHeap.root!.val).toBe(6);
  });
  test("合并", () => {
    const skewHeap1 = new SkewHeap();
    const skewHeap2 = new SkewHeap();
    const data = [8, 12];
    data.forEach((val) => skewHeap1.insert(val));
    skewHeap.merge(skewHeap1);
    expect(skewHeap.root!.val).toBe(6);
    skewHeap2.merge(skewHeap1);
    expect(skewHeap2.root!.val).toBe(8);
  });
});

describe("二项队列", () => {
  const binQueue = new BinomialQueue();
  test("插入", () => {
    const data = [6, 3, 9, 10, 13];
    data.forEach((val) => binQueue.insert(val));
    expect(binQueue.forest.length).toBe(3);
  });
  test("查找最小元", () => {
    expect(binQueue.findMin()!.val).toBe(3);
  });
  test("删除最小元", () => {
    binQueue.deleteMin();
    expect(binQueue.findMin()!.val).toBe(6);
  });
  test("合并", () => {
    const binQueue1 = new BinomialQueue();
    const data = [8, 12, 20, 7, 4];
    data.forEach((val) => binQueue1.insert(val));
    binQueue.merge(binQueue1);
    expect(binQueue.forest.length).toBe(4);
  });
});
