/**
 * 插入排序
 */

export default function insertSort (arr: number[]): number[] {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        const value = arr[i];
        let j = i;
        while (j > 0) {
            if (value < arr[j - 1]) {
                arr[j] = arr[j - 1];
                j -= 1;
            } else {
                break;
            }
        }
        arr[j] = value;
    }
    return arr;
}