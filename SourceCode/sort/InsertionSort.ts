/** @format */

export default function insertionSort(n: number[], left = 0, right = n.length): void {
    for (let i = left + 1; i < right; i++) {
        const value = n[i]
        let j = i
        while (j > 0 && value < n[j - 1]) {
            n[j] = n[j - 1]
            j -= 1
        }
        n[j] = value
    }
}
