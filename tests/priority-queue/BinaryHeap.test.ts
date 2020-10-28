import BinaryHeap from '@/priority-queue/BinaryHeap';

describe("binary heap", () => {
    const data = [15, 17, 13, 9, 16, 14, 10].map((key) => ({ key, value: key }));
    test('initialization with no data', () => {
        const binaryHeap = new BinaryHeap();
        expect(binaryHeap.size).toBe(0)
        expect(() => {
            binaryHeap.deleteMin()
        }).toThrowError(Error);
        expect(() => {
            binaryHeap.getMin()
        }).toThrowError(Error);
        data.forEach(value => binaryHeap.insert(value));
        expect(binaryHeap.getMin()).toStrictEqual({ key: 9, value: 9 });
        expect(binaryHeap.deleteMin()).toStrictEqual({ key: 9, value: 9 });
        expect(binaryHeap.getMin()).toStrictEqual({ key: 10, value: 10 });
    })
    let binaryHeap: BinaryHeap<{ key: number, value: number }>;
    test("initialization with data", () => {
        const data = [15, 17, 13, 9, 16, 14, 10].map((key) => ({ key, value: key }));
        binaryHeap = new BinaryHeap(data);
        expect(binaryHeap.size).toBe(data.length);
        expect(binaryHeap.getMin()).toStrictEqual({ key: 9, value: 9 });
        expect(binaryHeap.deleteMin()).toStrictEqual({ key: 9, value: 9 });
        expect(binaryHeap.getMin()).toStrictEqual({ key: 10, value: 10 });
    });
});