/**
 * 插入排序
 */

export default function insertionSort (arr: number[], start = 0, end = arr.length - 1) {
    for (let i = start + 1; i <= end; i++) {
        const value = arr[i];
        let j = i;
        while (j > 0 && value < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = value;
    }
}