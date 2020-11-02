import { heapSort } from '@/sort/HeapSort';
import insertionSort from '@/sort/InsertionSort';
import mergeSort from '@/sort/MergeSort';
import shellSort from '@/sort/ShellSort';


function initializeData(): number[] {
    return [34, 8, 64, 51, 32, 21]
}

describe('sort', () => {

    const MAX_NUM = 64;;
    const MIN_NUM = 8;
    const LAST_INDEX = 5;
    let data: number[];
    beforeEach(() => {
        data = initializeData();
        expect(data[0]).toBe(34);
        expect(data[LAST_INDEX]).toBe(21);
    });
    test('Insertion Sort', () => {
        insertionSort(data);
        expect(data[0]).toBe(MIN_NUM);
        expect(data[LAST_INDEX]).toBe(MAX_NUM);
    });
    test('Shell Sort', () => {
        shellSort(data);
        expect(data[0]).toBe(MIN_NUM);
        expect(data[LAST_INDEX]).toBe(MAX_NUM);
    });
    test('Heap Sort', () => {
        heapSort(data);
        expect(data[0]).toBe(MIN_NUM);
        expect(data[LAST_INDEX]).toBe(MAX_NUM);
    });
    test('Merge Sort', () => {
        mergeSort(data);
        expect(data[0]).toBe(MIN_NUM);
        expect(data[LAST_INDEX]).toBe(MAX_NUM);
    });
})

