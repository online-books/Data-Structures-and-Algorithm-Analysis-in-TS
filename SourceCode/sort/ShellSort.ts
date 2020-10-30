const INCREMENT = [0, 1, 3, 7, 15, 19, 41, 109];

export default function shellSort(arr: number[]): void {
    const { length } = arr;
    let index = INCREMENT.length - 1;
    while (INCREMENT[index] > length / 2) {
        index -= 1;
    }
    for (; index > 0; index--) {
        const step = INCREMENT[index];
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