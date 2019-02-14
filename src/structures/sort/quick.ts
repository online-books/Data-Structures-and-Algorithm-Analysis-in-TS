import insertionSort from './insertion';

function swap (arr: number[], start: number, end: number) {
    const tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;
}
function midian3 (arr: number[], start: number, end: number): number {
    const middle = Math.floor((start + end) / 2);
    if (arr[start] > arr[middle]) {
        swap(arr, middle, start);
    }
    if (arr[start] > arr[end]) {
        swap(arr, end, start);
    }
    if (arr[middle] > arr[end]) {
        swap(arr, end, middle);
    }
    swap(arr, middle, end - 1);
    return arr[end - 1];
}


export default function quickSort (arr: number[], start = 0, end = arr.length - 1): void {
    if (end - start >= 3) {
        const pivot = midian3(arr, start, end);
        let i = start;
        let j = end - 1;
        while (true) {
            while (arr[--j] > pivot) {}
            while (arr[++i] < pivot) {}
            if (j > i) {
                swap(arr, i, j);
            } else {
                break;
            }
        }
        swap(arr, i, end - 1);
        quickSort(arr, start, i - 1);
        quickSort(arr, i + 1, end);
    } else {
        insertionSort(arr, start, end);
    }
}