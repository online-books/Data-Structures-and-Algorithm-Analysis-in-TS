// 选择排序
export default function selectSort(arr: number[]) {
    const l = arr.length;
    for (let i = 0; i < l - 1; i++) {
        let minValue = arr[i];
        for (let j = i + 1; j < l; j++) {
            const value = arr[j];
            if (value < minValue) {
                arr[j] = minValue;
                minValue = value;
            }
        }
        arr[i] = minValue;
    }
}