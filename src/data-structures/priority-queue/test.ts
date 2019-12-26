import BinaryHeap from './binary-heap';

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
    })
});