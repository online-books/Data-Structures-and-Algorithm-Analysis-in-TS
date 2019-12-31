import BinaryHeap from './binary-heap';
import LeftistHeap from './leftist-heap';
import LeftistHeapNode from './leftist-heap-node';
import SkewHeap from './skew-heap';

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
        const data = [10, 8, 3, 21, 14, 17];
        data.forEach(val => heap.insert(val));
        const root = heap.root;
        expect(root).toBeInstanceOf(LeftistHeapNode);
        expect(root!.npl).toBe(1);
        expect(root!.val).toBe(3);
    });
    test('删除最小值', () => {
        heap.deleteMin();
        const root = heap.root;
        expect(root!.val).toBe(8);
    });
    test('合并', () => {
        const heap1 = new LeftistHeap();
        const heap2 = new LeftistHeap();
        const data = [6, 12, 18, 24];
        data.forEach(val => heap1.insert(val));
        heap.merge(heap1);
        heap2.merge(heap1);
        expect(heap.root!.val).toBe(6);
        expect(heap2.root!.val).toBe(6);
    })
});

describe('斜堆', () => {
    const skewHeap = new SkewHeap();
    test('插入', () => {
        const data = [6, 3, 9, 10, 13];
        data.forEach(val => skewHeap.insert(val));
        expect(skewHeap.root!.val).toBe(3);
    });
    test('删除最小元', () => {
        skewHeap.deleteMin();
        expect(skewHeap.root!.val).toBe(6);
    });
    test('合并', () => {
        const skewHeap1 = new SkewHeap();
        const skewHeap2 = new SkewHeap();
        const data = [8, 12];
        data.forEach(val => skewHeap1.insert(val));
        skewHeap.merge(skewHeap1);
        expect(skewHeap.root!.val).toBe(6);
        skewHeap2.merge(skewHeap1);
        expect(skewHeap2.root!.val).toBe(8);
    })
})
