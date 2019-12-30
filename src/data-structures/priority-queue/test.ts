import BinaryHeap from './binary-heap';
import LeftistHeap from './leftist-heap';
import LeftistHeapNode from './leftist-heap-node';

describe('二叉堆', () => {
    const data = [15, 17, 13, 9, 16, 14, 10];
    const binaryHeap = BinaryHeap.create(data);
    test('构建', () => {
        expect(binaryHeap.isEmpty()).toBeFalsy();
    })
    test('获取最小值', () => {
        expect(binaryHeap.findMin()).toBe(9);
    });
    test('删除最小值', () => {
        binaryHeap.deleteMin();
        expect(binaryHeap.findMin()).toBe(10);
    });
    test('插入', () => {
        binaryHeap.insert(1);
        expect(binaryHeap.findMin()).toBe(1);
    });
});

describe('左式堆', () => {
    const heap = new LeftistHeap();
    test('插入', () => {
        const data = [3, 10, 8, 21, 14, 17];
        data.forEach(val => heap.insert(val));
        const root = heap.getRoot();
        expect(root).toBeInstanceOf(LeftistHeapNode);
        expect(root!.npl).toBe(1);
    });
    test('获取最小值', () => {
        const root = heap.getRoot();
        expect(root!.val).toBe(3);
    });
    test('删除最小值', () => {
        heap.deleteMin();
        const root = heap.getRoot();
        expect(root!.val).toBe(8);
    });
    test('合并', () => {
        const heap1 = new LeftistHeap();
        const data = [6, 12, 18, 24];
        data.forEach(val => heap1.insert(val));
        heap.mergeHeap(heap1);
        const root = heap.getRoot();
        expect(root!.val).toBe(6);
    })
});
