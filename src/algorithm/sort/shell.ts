export default function shellSort (arr: number[]): void {
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