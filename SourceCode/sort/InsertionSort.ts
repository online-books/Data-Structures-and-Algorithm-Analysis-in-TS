export default function insertionSort(arr: number[]) {
    const { length } = arr;
    for (let i = 1; i < length; i++) {
        const value = arr[i];
        let j = i;
        while (j > 0 && value < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = value;
    }
}