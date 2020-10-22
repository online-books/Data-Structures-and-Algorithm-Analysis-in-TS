import BinaryHeap from '@/priorty-queue/binary-heap';

describe("binary heap", () => {
    const data = [15, 17, 13, 9, 16, 14, 10].map((value) => ({ value }));
    const binaryHeap = BinaryHeap.create(data);
    test("initialization", () => {
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