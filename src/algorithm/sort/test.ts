import insertionSort from './insertion';
import mergeSort from './merge';
import quickSort from './quick';
import selectSort from './select';
import shellSort from './shell';


function generateTestArray (size: number) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * size);
        arr.push(value);
    }
    return arr;
}

describe.only('排序算法', () => {
    test('选择排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        selectSort(arr);
        console.log(arr);
    });
    test('插入排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        insertionSort(arr);
        console.log(arr);
    });
    test('归并排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        const result = mergeSort(arr);
        console.log(result);
    });
    test('希尔排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        shellSort(arr);
        console.log(arr);
    });
    test.only('快速排序', () => {
        const size = 5;
        const arr = generateTestArray(size);
        console.log(arr);
        quickSort(arr);
        console.log(arr);
    });
})