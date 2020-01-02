// 归并排序
function merge(arr1: number[], arr2: number[]): number[] {
    const result: number[] = [];
    while (arr1.length && arr2.length) {
        const value1 = arr1[0];
        const value2 = arr2[0];
        if (value1 < value2) {
            result.push(arr1.shift() as number);
        } else {
            if (value1 > value2) {
                result.push(arr2.shift() as number);
            } else {
                arr1.shift()
                result.push(arr2.shift() as number);
            }
        }
    }
    while (arr1.length) {
        result.push(arr1.shift() as number);
    }
    while (arr2.length) {
        result.push(arr2.shift() as number);
    }
    return result;
}

export default function mergeSort(arr: number[], star = 0, end = arr.length): number[] {
    if (arr.length === 1) {
        return arr;
    }
    const middle = Math.floor((star + end) / 2);
    const leftArr = arr.slice(star, middle);
    const rightArr = arr.slice(middle, end);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}