/**
 * 希尔排序使用一个增量序列{h1,h2,...hk}(h1=1),在使用增量hk的一趟排序后，对于每一个i都有A[i]<A[i+hk],
 * 所有相隔hk的元素都被排序，此时数组是hk-排序的。
 * 希尔排序的增量序列中最好的序列是{1,5,19,41,109,...},该序列中的项或是9*4I-9*2I+1或4I-3*2I+1。
 */
export default function shellSort(arr: number[]): void {
    const length = arr.length;
    if (length <= 1) {
        return;
    }
    let step = Math.floor(length / 2);
    for (; step > 0; step = Math.floor(step / 2)) {
        for (let i = step; i < length; i++) {
            const value = arr[i];
            let j = i;
            for (; j >= step; j -= step) {
                if (value < arr[j - step]) {
                    arr[j] = arr[j - step];
                } else {
                    break;
                }
            }
            arr[j] = value;
        }
    }
}