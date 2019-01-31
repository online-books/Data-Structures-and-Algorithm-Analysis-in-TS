import insertSort from './insert';
import mergeSort from './merge';
import selectSort from './select';

function generateTestArray (size: number) {
    const set =new Set();
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * size);
        set.add(value);
    }
    set.add(size);
    return Array.from(set);
}

describe.only('排序算法', () => {
    test('选择排序', () => {
        const size=20;
        const arr = generateTestArray(size);
        const result = selectSort(arr);
        expect(result[arr.length-1]).toBe(size);
    });
    test('插入排序', () => {
        const size = 20;
        const arr = generateTestArray(size);
        const result = insertSort(arr);
        expect(result[arr.length - 1]).toBe(size);
    });
    test.only('归并排序',()=>{
        const size=100;
        const arr = generateTestArray(size);
        const result=mergeSort(arr);
        expect(result[arr.length - 1]).toBe(size);
    });
})