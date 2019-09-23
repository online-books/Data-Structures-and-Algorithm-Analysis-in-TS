import insertionSort from './insertion';
import mergeSort from './merge';
import quickSort from './quick';
import selectSort from './select';
import shellSort from './shell';


function generateTestArray(size: number) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * size);
        arr.push(value);
    }
    return arr;
}

describe('排序算法', () => {
    test('选择排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        selectSort(arr);
    });
    test('插入排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        insertionSort(arr);
    });
    test('归并排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        mergeSort(arr);
    });
    test('希尔排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        shellSort(arr);
    });
    test('快速排序', () => {
        const size = 5;
        const arr = generateTestArray(size);
        quickSort(arr);
    });
})