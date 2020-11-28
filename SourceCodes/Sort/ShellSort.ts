/** @format */

const INCREMENT = [0, 1, 5, 19, 41, 109, 505, 929, 3905, 16001]

export default function shellSort(n: number[]): void {
    const {length} = n
    let index = INCREMENT.length - 1
    while (INCREMENT[index] > length / 2) {
        index -= 1
    }
    for (; index > 0; index--) {
        const step = INCREMENT[index]
        for (let i = step; i < length; i++) {
            const value = n[i]
            let j = i
            for (; j >= step; j -= step) {
                if (value < n[j - step]) {
                    n[j] = n[j - step]
                } else {
                    break
                }
            }
            n[j] = value
        }
    }
}
