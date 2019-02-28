import BinaryHeap from './index';

describe('二叉堆', () => {
    test('构建二叉堆', () => {
        const data = [15, 17, 13, 9, 16, 14, 10];
        const binaryHeap = BinaryHeap.create(data);
        expect(binaryHeap.findMin()).toBe(9);
    });
});